import { useState } from 'react';
import SymbolForm from './components/SymbolForm';
import Ticker from './components/Ticker';
import RecentTradesTable from './components/RecentTradesTable';

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const handleChange = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div>
      <SymbolForm value={selectedSymbol} onSubmit={handleChange}/>
      {selectedSymbol !== '' && (
        <>
          <Ticker symbol={selectedSymbol} />
          <RecentTradesTable symbol={selectedSymbol} />
        </>
      )}
    </div>
  )
}

export default App;
