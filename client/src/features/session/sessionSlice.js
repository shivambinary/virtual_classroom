import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSessionsByClass,
  createSession,
  startSession,
} from "./sessionAPI";

export const fetchSessions = createAsyncThunk(
  "session/fetchByClass",
  async (classId, thunkAPI) => {
    try {
      const res = await getSessionsByClass(classId);
      return res.data.data || res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch sessions");
    }
  }
);

// 📅 Schedule session
export const scheduleSession = createAsyncThunk(
  "session/schedule",
  async (data, thunkAPI) => {
    try {
      const res = await createSession(data);
      return res.data.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to schedule");
    }
  }
);

// ▶ Start session
export const startLiveSession = createAsyncThunk(
  "session/start",
  async (sessionId, thunkAPI) => {
    try {
      const res = await startSession(sessionId);
      return res.data.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to start");
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(scheduleSession.fulfilled, (state, action) => {
        state.sessions.unshift(action.payload);
      });
  },
});

export default sessionSlice.reducer;