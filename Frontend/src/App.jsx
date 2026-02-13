import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Jobs from "./pages/jobs";
import ProtectedRoute from "./components/protectedRoute";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register/>}/>
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
