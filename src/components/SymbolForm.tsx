import { FormEvent, useState } from 'react';
import { GoSync } from 'react-icons/go';
import styled from 'styled-components';

import { useFetchSymbolsQuery } from '../store';
import SymbolDropdown from './SymbolDropdown';

const SymbolFormWrapper = styled.form`
  display: flex;
`;

function SymbolForm() {
  const {data, isLoading} = useFetchSymbolsQuery();
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (symbol: string) => {
    setSelectedSymbol(symbol);
  }

  if (isLoading) {
    return <GoSync/>
  }

  return (
    <SymbolFormWrapper onSubmit={(e) => handleSubmit(e)}>
      <label className="flex mr-3">Symbol :</label>
      <SymbolDropdown symbols={data || []} selectedSymbol={selectedSymbol} onChange={handleChange}/>
      <button>Submit</button>
    </SymbolFormWrapper>
  );
}

export default SymbolForm;