import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const Signup = lazy(()=>import('./pages/Signup'))
const Login = lazy(()=>import('./pages/Login'))
const Dashboard = lazy(()=>import('./pages/Dashboard'))

function App() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
        </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
