import { useState } from 'react';
import SymbolForm from './components/SymbolForm';
import Ticker from './components/Ticker';

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const handleChange = (symbol: string) => {
    setSelectedSymbol(symbol);
  }

  return (
    <div>
      <SymbolForm value={selectedSymbol} onSubmit={handleChange}/>
      {selectedSymbol !== '' && <Ticker symbol={selectedSymbol} />}
    </div>
  )
}

export default App;
