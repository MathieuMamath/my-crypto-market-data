import { useState } from 'react';
import SymbolForm from './components/SymbolForm';
import Ticker from './components/Ticker';
import RecentTradesTable from './components/RecentTradesTable';
import { SymbolProps } from './store/apis/symbolsApi';

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolProps>({ name: '', baseAsset: '', quoteAsset: ''});

  const handleChange = (symbol: SymbolProps) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div>
      <SymbolForm value={selectedSymbol} onSubmit={handleChange}/>
      {selectedSymbol.name !== '' && (
        <>
          <Ticker symbol={selectedSymbol} />
          <RecentTradesTable symbol={selectedSymbol} />
        </>
      )}
    </div>
  )
}

export default App;
