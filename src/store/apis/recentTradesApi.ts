import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BINANCE_BASE_URL } from '../../config/binance';
import { RestMarketTypes } from '@binance/connector-typescript';

export type RecentTradeProps = {
  id: number;
  price: number;
  qty: number;
  quoteQty: number;
};

const recentTradesApi = createApi({
  reducerPath: 'trades',
  baseQuery: fetchBaseQuery({
    baseUrl: BINANCE_BASE_URL
  }),
  endpoints: (builder) => {
    return {
      fetchRecentTrades: builder.query<RestMarketTypes.recentTradesListResponse,string>({
        query(symbol) {
          return {
            url: '/trades',
            method: 'GET',
            params: {
              symbol
            }
          }
        }
      })
    }
  }
});

export const {
  useFetchRecentTradesQuery
} = recentTradesApi;
export { recentTradesApi };