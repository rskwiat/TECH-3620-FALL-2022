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
  darkMode: false,
};

export const getPrivacyDetails = createAsyncThunk("privacy/getPrivacy", async () => {
  const response = await fetch(`${API.service}/privacyPolicy`);
  const data = await response.json();
  return data;
});

export const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPrivacyDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPrivacyDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response.data = action.payload.response.data;
      state.response.statusCode = action.payload.statusCode;
    });
    builder.addCase(getPrivacyDetails.rejected, (state) => {
      state.isFetchError = true;
      state.errorMessage = "An error has occurred";
      state.statusCode = "500";
    });
  },
});

export const { setDarkMode } = SettingsSlice.actions;

export default SettingsSlice.reducer;
