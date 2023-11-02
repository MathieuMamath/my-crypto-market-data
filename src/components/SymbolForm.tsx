import { FormEvent, useState } from 'react';
import { GoSync } from 'react-icons/go';

import { useFetchSymbolsQuery } from '../store';
import {
  Form,
  Field,
  Label,
  Error,
  Dropdown,
  DropdownItem,
  DropdownList,
  Button
} from './SymbolForm.styles';

type SymbolFormProps = {
  value: string;
  onSubmit: (a: string) => void;
};

function SymbolForm({ value, onSubmit }: SymbolFormProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [symbolError, setSymbolError] = useState<string>('');
  const {data, error, isLoading} = useFetchSymbolsQuery();

  if (isLoading) {
    return <GoSync/>;
  } else if (error) {
    return <div>Error while fetching symbols...</div>;
  } else if (!data) {
    return <div>Not found any symbol...</div>
  }

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();
    setIsOpen(false);

    if (data.find(symbol => symbol.name === selectedSymbol)) {
      onSubmit(selectedSymbol);
    } else {
      setSymbolError('Not valid symbol !!!');
    }

  };

  const handleChange = (e : FormEvent<HTMLInputElement>) => {
    setSelectedSymbol(e.currentTarget.value);
    setSymbolError('');
  };

  const handleSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
    setIsOpen(false);
    setSymbolError('');
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderedSymbols = data
    .filter(symbol => symbol.name.toLowerCase().includes(selectedSymbol.toLowerCase()))
    .map(symbol =>
    <DropdownItem key={symbol.name} onClick={() => handleSelect(symbol.name)}>
      {symbol.name}
    </DropdownItem>
  );

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Field>
        <Label>Symbol :</Label>
        <div>
          <Dropdown className={symbolError !== '' ? 'error' : ''}value={selectedSymbol} onClick={handleOpen} onChange={handleChange} />

          {symbolError !== '' && <Error>{symbolError}</Error>}

          {isOpen &&
            <div>
              <DropdownList >
                {renderedSymbols}
              </DropdownList>
            </div>
          }
        </div>
      </Field>

      <Button>Submit</Button>
    </Form>
  );
}

export default SymbolForm;