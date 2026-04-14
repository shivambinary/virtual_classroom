import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../components/layout/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ClassPage from "../pages/classroom/ClassPage";
import SessionPage from "../pages/classroom/SessionPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/class/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ClassPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/session/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <SessionPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;