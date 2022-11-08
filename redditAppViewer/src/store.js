import { configureStore } from "@reduxjs/toolkit";
import ListingReducer from "./redux/ListingReducer";
import SettingsReducer from "./redux/SettingsReducer";

export const store = configureStore({
  reducer: {
    listing: ListingReducer,
    settings: SettingsReducer,
  }
});
