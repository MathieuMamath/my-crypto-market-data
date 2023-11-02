import { FormEvent, useState } from 'react';
import { GoSync } from 'react-icons/go';
import styled from 'styled-components';

import { useFetchSymbolsQuery } from '../store';

const SymbolFormWrapper = styled.form`
  display: flex;
`;

const Selector = styled.div`
  height: 3rem;
  width: 10rem;
  border: black 1px solid;
  border-radius: 4px;
`;

const SelectorList = styled.div`
  max-height: 10rem;
  overflow-y: scroll;
`;

type SymbolFormProps = {
  value: string;
  onSubmit: (a: string) => void;
};

function SymbolForm({ value, onSubmit }: SymbolFormProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {data, error, isLoading} = useFetchSymbolsQuery();

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();
    onSubmit(selectedSymbol);
  };

  const handleChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return <GoSync/>;
  } else if (error) {
    return <div>Error while fetching symbols...</div>;
  } else if (!data) {
    return <div>Not found any symbol...</div>
  }

  const renderedSymbols = data.map(symbol => {
    return <div key={symbol.name} onClick={() => handleChange(symbol.name)}>
      {symbol.name}
    </div>
  });

  return (
    <SymbolFormWrapper onSubmit={(e) => handleSubmit(e)}>
      <label className="flex mr-3">Symbol :</label>

      <Selector onClick={handleOpen} className="w-8">
        {selectedSymbol}
      </Selector>

      {isOpen &&
        <SelectorList>
          {renderedSymbols}
        </SelectorList>
      }
      <button>Submit</button>
    </SymbolFormWrapper>
  );
}

export default SymbolForm;