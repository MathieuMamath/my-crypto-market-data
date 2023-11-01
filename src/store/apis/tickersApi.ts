import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BINANCE_BASE_URL } from "../../config/binance";
import { RestMarketTypes } from '@binance/connector-typescript';

const tickersApi = createApi({
  reducerPath: 'tickers',
  baseQuery: fetchBaseQuery({
    baseUrl: BINANCE_BASE_URL
  }),
  endpoints: (builder) => {
    return {
      fetchTicker: builder.query<RestMarketTypes.ticker24hrResponse, string>({
        query(symbol) {
          return {
            url: '/ticker/24hr',
            method: 'GET',
            params: {
              symbol
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