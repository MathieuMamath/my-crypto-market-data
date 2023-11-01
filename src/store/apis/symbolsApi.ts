import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BINANCE_BASE_URL } from '../../config/binance';
import { RestMarketTypes } from '@binance/connector-typescript';

export type SymbolProps = {
  name: string;
};

const symbolsApi = createApi({
  reducerPath: 'symbols',
  baseQuery: fetchBaseQuery({
    baseUrl: BINANCE_BASE_URL
  }),
  endpoints: (builder) => {
    return {
      fetchSymbols: builder.query<SymbolProps[], void>({
        query() {
          return {
            url: '/exchangeInfo',
            method: 'GET'
          }
        },
        transformResponse(reponse: RestMarketTypes.exchangeInformationResponse) {
          return reponse.symbols.map(symbol => {
            return {
              name: symbol.symbol
            };
          });
        }
      })
    }
  }
});

export const {
  useFetchSymbolsQuery
} = symbolsApi;
export { symbolsApi };