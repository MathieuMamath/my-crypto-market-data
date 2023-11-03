import { GoSync } from 'react-icons/go';
import { useFetchTickerQuery } from '../store';

function Ticker({ symbol }: { symbol: string }) {
  const {data, error, isFetching} = useFetchTickerQuery(symbol);

  if (isFetching) {
    return <GoSync/>;
  } else if (error) {
    return <div>Error while fetching ticker for {symbol}...</div>;
  } else if (!data) {
    return <div>No ticker information for {symbol}...</div>;
  }

  return (
    <div className="flex p-5 w-full border-t border-b border-x-gray-400 items-center text-xs">
      <h1 className="font-bold text-lg mr-5">{data.symbol}</h1>
      <div className={`font-bold text-lg ${parseFloat(data.bidPrice) < parseFloat(data.openPrice) ? 'text-rose-500' : 'text-emerald-400'}`}>
        {data.bidPrice}
      </div>
      <div className={'ml-5'}>
        <div>24h Change</div>
        <div className={`font-bold ${parseFloat(data.priceChange) < 0 ? 'text-rose-500' : 'text-emerald-400'}`}>
          {data.priceChange} {data.priceChangePercent}%
        </div>
      </div>
      <div className={'ml-5'}>
        <div>24h High </div>
        <div className="font-bold">{data.highPrice}</div>
      </div>
      <div className={'ml-5'}>
        <div>24h Low</div>
        <div className="font-bold">{data.lowPrice}</div>
      </div>
    </div>
  );
}

export default Ticker;