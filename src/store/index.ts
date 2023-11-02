import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { symbolsApi } from './apis/symbolsApi';
import { tickersApi } from './apis/tickersApi';
import { recentTradesApi } from './apis/recentTradesApi';

export const store = configureStore({
  reducer: {
    [symbolsApi.reducerPath]: symbolsApi.reducer,
    [tickersApi.reducerPath]: tickersApi.reducer,
    [recentTradesApi.reducerPath]: recentTradesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(symbolsApi.middleware)
      .concat(tickersApi.middleware)
      .concat(recentTradesApi.middleware);
  }
});

setupListeners(store.dispatch);

export {
  useFetchSymbolsQuery
} from './apis/symbolsApi';
export {
  useFetchTickerQuery
} from './apis/tickersApi';
export {
  useFetchRecentTradesQuery
} from './apis/recentTradesApi';