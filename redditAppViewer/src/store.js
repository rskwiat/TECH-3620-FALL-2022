import { configureStore } from "@reduxjs/toolkit";
import ListingReducer from "./redux/ListingReducer";

export const store = configureStore({
  reducer: {
    listing: ListingReducer
  }
});
