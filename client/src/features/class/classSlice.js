import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyClasses,
  getAllClasses,
  createClass,
  getClassById,
} from "./classAPI";

export const fetchClasses = createAsyncThunk(
  "class/fetchClasses",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const role = state.auth.user?.role;

      const res =
        role === "teacher"
          ? await getMyClasses()
          : await getAllClasses();

      return res.data.data || res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch classes");
    }
  }
);

export const addClass = createAsyncThunk(
  "class/addClass",
  async (data, thunkAPI) => {
    try {
      const res = await createClass(data);
      return res.data.data || res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to create class");
    }
  }
);

export const fetchClassById = createAsyncThunk(
  "class/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await getClassById(id);
      return res.data.data || res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch class");
    }
  }
);

const classSlice = createSlice({
  name: "class",

  initialState: {
    classes: [],
    currentClass: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== CREATE =====
      .addCase(addClass.fulfilled, (state, action) => {
        state.classes.unshift(action.payload);
      })

      // ===== FETCH BY ID (NEW) =====
      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClassById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClass = action.payload;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default classSlice.reducer;