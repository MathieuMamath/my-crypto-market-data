import { FormEvent, useState } from 'react';
import { GoSync } from 'react-icons/go';

import { useFetchSymbolsQuery } from '../store';

type SymbolFormProps = {
  value: string;
  onSubmit: (symbol: string) => void;
};

function SymbolForm({ value, onSubmit }: SymbolFormProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    setIsOpen(false);

    if (data.find(symbol => symbol.name === selectedSymbol)) {
      onSubmit(selectedSymbol);
    } else {
      setSymbolError('Not valid symbol !!!');
    }

  };

  const handleChange = (e : FormEvent<HTMLInputElement>) => {
    setSelectedSymbol(e.currentTarget.value);
    setIsOpen(true);
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
    <div className="pl-4 pt-1 pb-1 hover:bg-gray-100" key={symbol.name} onClick={() => handleSelect(symbol.name)}>
      {symbol.name}
    </div>
  );

  return (
    <form className="flex ml-5 mt-5 mb-5" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex">
        <label className="flex items-center mr-4 font-bold">Symbol :</label>
        <div>
          <input
            className={`flex items-center h-10 border-black border rounded mr-2 w-48 p-5 ${symbolError !== '' && 'border-rose-500'}`}
            value={selectedSymbol}
            onClick={handleOpen}
            onChange={handleChange} />

          {symbolError !== '' && <div className="text-rose-500 text-xs absolute">{symbolError}</div>}

          {isOpen &&
            <div>
              <div className="absolute rounded mr-2 w-48 bg-white max-h-48 overflow-y-scroll border border-black">
                {renderedSymbols}
              </div>
            </div>
          }
        </div>
      </div>

      <button className="text-white bg-blue-500 hover:bg-blue-600 rounded px-4">Submit</button>
    </form>
  );
}

export default SymbolForm;