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
      const formData = new FormData();

      formData.append("classId", data.classId);
      formData.append("title", data.title);
      formData.append("file", data.file);

      const res = await uploadMaterial(formData);

      return res.data.data;
    } catch (err) {
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

      .addCase(addMaterial.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = [action.payload, ...state.materials];
      })
      .addCase(addMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default materialSlice.reducer;