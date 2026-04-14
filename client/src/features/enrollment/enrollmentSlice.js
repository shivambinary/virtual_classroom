import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestEnrollment,
  approveEnrollment,
  getEnrollments,
} from "./enrollmentAPI";

export const fetchEnrollments = createAsyncThunk(
  "enrollment/fetch",
  async (classId, thunkAPI) => {
    try {
      const res = await getEnrollments(classId);
      return res.data.data || res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch enrollments");
    }
  }
);

export const enrollInClass = createAsyncThunk(
  "enrollment/request",
  async (classId, thunkAPI) => {
    try {
      await requestEnrollment(classId);
      return classId;
    } catch {
      return thunkAPI.rejectWithValue("Request failed");
    }
  }
);

export const approveRequest = createAsyncThunk(
  "enrollment/approve",
  async (id, thunkAPI) => {
    try {
      await approveEnrollment(id);
      return id;
    } catch {
      return thunkAPI.rejectWithValue("Approval failed");
    }
  }
);

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: {
    enrollments: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(approveRequest.fulfilled, (state, action) => {
        state.enrollments = state.enrollments.filter(
          (e) => e._id !== action.payload
        );
      });
  },
});

export default enrollmentSlice.reducer;