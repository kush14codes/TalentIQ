import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import JobDescription from "./pages/JobDescription";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* New AI Resume Analysis Page */}

      <Route
        path="/resume-analysis"
        element={
          <ProtectedRoute>
            <ResumeAnalysis />
          </ProtectedRoute>
        }
      />

      {/* Existing Pages (kept temporarily) */}

      <Route
        path="/resume-upload"
        element={
          <ProtectedRoute>
            <ResumeUpload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/job-description"
        element={
          <ProtectedRoute>
            <JobDescription />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;