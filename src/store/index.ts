import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { symbolsApi } from "./apis/symbolsApi";
import { tickersApi } from "./apis/tickersApi";

export const store = configureStore({
  reducer: {
    [symbolsApi.reducerPath]: symbolsApi.reducer,
    [tickersApi.reducerPath]: tickersApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(symbolsApi.middleware)
      .concat(tickersApi.middleware);
  }
});

setupListeners(store.dispatch);

export {
  useFetchSymbolsQuery
} from './apis/symbolsApi';
export {
  useFetchTickerQuery
} from './apis/tickersApi';