import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BINANCE_BASE_URL } from '../../config/binance';
import { RestMarketTypes } from '@binance/connector-typescript';

interface FetchTickerProps {
  symbol: string;
  windowSize: string;
}

const tickersApi = createApi({
  reducerPath: 'tickers',
  baseQuery: fetchBaseQuery({
    baseUrl: BINANCE_BASE_URL
  }),
  endpoints: (builder) => {
    return {
      fetchTicker: builder.query<RestMarketTypes.rollingWindowPriceChangeStatisticsResponse, FetchTickerProps>({
        query({ symbol, windowSize }) {
          return {
            url: '/ticker',
            method: 'GET',
            params: {
              symbol,
              windowSize
            }
          }
        }
      })
    };
  }
});

export const {
  useFetchTickerQuery
} = tickersApi;
export { tickersApi };