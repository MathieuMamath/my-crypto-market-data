import { GoSync } from 'react-icons/go';
import { useFetchTickerQuery } from '../store';
import {
  TickerInfo,
  TickerWrapper
} from './Ticker.styles'

function Ticker({ symbol }: { symbol: string }) {
  const {data, error, isFetching} = useFetchTickerQuery(symbol);

  if (isFetching) {
    return <GoSync/>;
  } else if (error) {
    return <div>Error while fetching ticker for {symbol}...</div>;
  } else if (!data) {
    return <div>No ticker information for {symbol}...</div>;
  }

  return <TickerWrapper>
    <h1>{data.symbol}</h1>
    <div className={`${parseFloat(data.bidPrice) < parseFloat(data.openPrice) ? 'red' : 'green'}`}>
      {data.bidPrice}
    </div>
    <TickerInfo>
      <div className="label">24h Change</div>
      <div className={`value ${parseFloat(data.priceChange) < 0 ? 'red' : 'green'}`}>
        {data.priceChange} {data.priceChangePercent}%
      </div>
    </TickerInfo>
    <TickerInfo>
      <div className="label">24h High </div>
      <div className="value">{data.highPrice}</div>
    </TickerInfo>
    <TickerInfo>
      <div className="label">24h Low</div>
      <div className="value">{data.lowPrice}</div>
    </TickerInfo>
  </TickerWrapper>;
}

export default Ticker;