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
  selectedImage: null,
  favorites: [],
};

//async thunk
export const getListingDetails = createAsyncThunk("listing/getListing", async () => {
  try {
    const response = await fetch(`${API.service}/reddit?subreddit=itookapicture`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
});

export const ListingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    selectImage: (state, action) => {
      state.selectedImage = action.payload
    },
    addToFavorites: (state, action) => {
      const id = state.favorites.map(item => item.id).includes(action.payload.id);
      if (!id) {
        state.favorites.push(action.payload)
      }
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
    builder.addCase(getListingDetails.rejected, (state, action) => {
      state.isFetchError = true;
      state.errorMessage = action.payload.error;
      state.statusCode = "500";
    });
  }
});

export const { selectImage, addToFavorites } = ListingSlice.actions;

export default ListingSlice.reducer;