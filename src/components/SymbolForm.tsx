import { FormEvent, useState } from 'react';
import { GoSync } from 'react-icons/go';

import { useFetchSymbolsQuery } from '../store';
import DropdownInput from './DropdownInput';
import Button from './Button';

type SymbolFormProps = {
  value: string;
  onSubmit: (symbol: string) => void;
};

function SymbolForm({ value, onSubmit }: SymbolFormProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(value);
  const [symbolError, setSymbolError] = useState<string>('');
  const {data, error, isLoading} = useFetchSymbolsQuery();

  if (isLoading) {
    return <GoSync/>;
  }
  if (error) {
    return <div>Error while fetching symbols...</div>;
  }
  if (!data) {
    return <div>Not found any symbol...</div>
  }

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();

    if (data.find(symbol => symbol.name === selectedSymbol)) {
      onSubmit(selectedSymbol);
    } else {
      setSymbolError('Not valid symbol !!!');
    }

  };

  const handleChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    setSymbolError('');
  };

  const symbols = data.map(symbol => symbol.name);

  return (
    <form className="flex ml-5 mt-5 mb-5" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex">
        <label className="flex items-center mr-4 font-bold">Symbol :</label>
        <DropdownInput
          value={selectedSymbol}
          onChange={handleChange}
          options={symbols}
          error={symbolError}
        />
      </div>

      <Button primary>Submit</Button>
    </form>
  );
}

export default SymbolForm;