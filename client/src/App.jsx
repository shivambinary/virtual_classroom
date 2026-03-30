import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateClass from "./pages/CreateClass";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* root redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       {/* <Route path="/dashboard" element={<Dashboard />} /> */}
<Route path="/dashboard" element={<Dashboard />} />

      </Routes>

      {/* <ProtectedRoute>
  <Dashboard />
</ProtectedRoute> */}


    </BrowserRouter>
  );
}

export default App;