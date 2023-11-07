import { GoSync } from 'react-icons/go';
import { useFetchTickerQuery } from '../store';
import { useState } from 'react';
import Button from './Button';
import { SymbolProps } from '../store/apis/symbolsApi';


interface WindowSizeProps {
  label: string;
  value: string;
}

function Ticker({ symbol }: { symbol: SymbolProps }) {
  const windowSizes = [
    { label: '1m', value: '1m' },
    { label: '5m', value: '5m' },
    { label: '15m', value: '15m' },
    { label: '1H', value: '1h' },
    { label: '1D', value: '1d' },
    { label: '1W', value: '7d' },
  ];
  const [selectedWindowSize, setSelectedWindowSize] = useState<WindowSizeProps>({ label: '1 D', value: '1d'});
  const {data, error, isFetching} = useFetchTickerQuery({ symbol: symbol.name, windowSize: selectedWindowSize.value });

  if (isFetching) {
    return <GoSync/>;
  } else if (error) {
    return <div>Error while fetching ticker for {symbol.name}...</div>;
  } else if (!data) {
    return <div>No ticker information for {symbol.name}...</div>;
  }

  const renderedWindowSizes = windowSizes.map(windowSize => {
    return (
      <div className="mr-2" key={windowSize.value}>
        <Button
          onClick={() => setSelectedWindowSize(windowSize)}
          disabled={windowSize.value === selectedWindowSize.value}
        >
          {windowSize.label}
        </Button>
      </div>
    );
  });

  return (
    <div className="w-full p-5 border-t border-b border-x-gray-400">
      <div className="flex pb-5 items-center text-xs">
        {renderedWindowSizes}
      </div>
      <div className="flex items-center text-xs">
        <h1 className="font-bold text-lg mr-5">{data.symbol}</h1>
        <div className={`font-bold text-lg ${parseFloat(data.weightedAvgPrice) < parseFloat(data.openPrice) ? 'text-rose-500' : 'text-emerald-400'}`}>
          {data.weightedAvgPrice}
        </div>
        <div className={'ml-5'}>
          <div>{selectedWindowSize.label} Change</div>
          <div className={`font-bold ${parseFloat(data.priceChange) < 0 ? 'text-rose-500' : 'text-emerald-400'}`}>
            {data.priceChange} {data.priceChangePercent}%
          </div>
        </div>
        <div className={'ml-5'}>
          <div>{selectedWindowSize.label} High</div>
          <div className="font-bold">{data.highPrice}</div>
        </div>
        <div className={'ml-5'}>
          <div>{selectedWindowSize.label} Low</div>
          <div className="font-bold">{data.lowPrice}</div>
        </div>
        </div>
    </div>
  );
}

export default Ticker;