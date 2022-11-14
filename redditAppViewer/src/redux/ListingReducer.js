import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../utils/constants";

const initialState = {
  isLoading: false,
  isFetchError: false,
  errorMessage: "",
  statusCode: "",
  response: {
    data: []
  },
  favorites: [],
  selected: null,
};

//async thunk
export const getListingDetails = createAsyncThunk("listing/getListing", async () => {
  const response = await fetch(`${API.service}/reddit?subreddit=itookapicture`);
  const data = await response.json();
  return data;
});

export const ListingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    selectedImage: (state, action) => {
      state.selected = action.payload;
    },
    addToFavorites: (state, action) => {
      const id = state.favorites.map(item => item.id).includes(action.payload.id);
      if (!id) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites.splice(action.payload.id, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListingDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListingDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response.data = action.payload.response.data;
      state.statusCode = action.payload.statusCode;
    });
    builder.addCase(getListingDetails.rejected, (state) => {
      state.isFetchError = true;
      state.isLoading = false;
      state.errorMessage = "An error has occurred";
      state.statusCode = "500";
    });
  }
});

export const { selectedImage, addToFavorites, removeFromFavorites } = ListingSlice.actions;

export default ListingSlice.reducer;