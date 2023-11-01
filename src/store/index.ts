import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { symbolsApi } from "./apis/symbolsApi";

export const store = configureStore({
  reducer: {
    [symbolsApi.reducerPath]: symbolsApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(symbolsApi.middleware);
  }
});

setupListeners(store.dispatch);

export {
  useFetchSymbolsQuery
} from './apis/symbolsApi';