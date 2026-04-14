import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import classReducer from "../features/class/classSlice";
import sessionReducer from "../features/session/sessionSlice";
import materialReducer from "../features/material/materialSlice";
import enrollmentReducer from "../features/enrollment/enrollmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: classReducer,
    session: sessionReducer,
    material: materialReducer,
    enrollment: enrollmentReducer,
  },
});