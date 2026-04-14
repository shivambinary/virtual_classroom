import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  uploadMaterial,
  getMaterials,
} from "./materialAPI";

export const fetchMaterials = createAsyncThunk(
  "material/fetch",
  async (classId, thunkAPI) => {
    try {
      const res = await getMaterials(classId);
      return res.data.data || res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch materials");
    }
  }
);

export const addMaterial = createAsyncThunk(
  "material/add",
  async (data, thunkAPI) => {
    try {
      const res = await uploadMaterial(data);
      return res.data.data;
    } catch {
      return thunkAPI.rejectWithValue("Upload failed");
    }
  }
);

const materialSlice = createSlice({
  name: "material",
  initialState: {
    materials: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addMaterial.fulfilled, (state, action) => {
        state.materials.unshift(action.payload);
      });
  },
});

export default materialSlice.reducer;