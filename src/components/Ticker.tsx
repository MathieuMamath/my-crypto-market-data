import { GoSync } from 'react-icons/go';
import { useFetchTickerQuery } from '../store';

type TickerProps = {
  symbol: string;
};

function Ticker({ symbol }: TickerProps) {
  const {data, error, isFetching} = useFetchTickerQuery(symbol);

  if (isFetching) {
    return <GoSync/>;
  } else if (error) {
    return <div>Error while fetching ticker for {symbol}...</div>
  }

  return <div>
    <div>Ticker: {data?.symbol}</div>
    <div>Bid price: {data?.bidPrice}</div>
    <div>Price change: {data?.priceChange}</div>
    <div>Price change Percent: {data?.priceChangePercent}</div>
    <div>24h Max price: {data?.highPrice}</div>
    <div>24h Min price: {data?.lowPrice}</div>

  </div>;
}

export default Ticker;