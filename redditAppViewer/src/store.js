import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ListingReducer from "./redux/ListingReducer";
import SettingsReducer from "./redux/SettingsReducer";

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    listing: ListingReducer,
    settings: SettingsReducer,
  },
});
