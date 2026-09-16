import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import ApartmentSearch from "./pages/ApartmentSearch";
import RoommateSearch from "./pages/RoommateSearch";
import MyListings from "./pages/MyListings";

// Auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Quiz
import QuizForm from "./components/quiz/quizform";

// Listings
import ApartmentDetail from "./components/listing/ApartmentDetail";
import CreateApartment from "./components/listing/CreateApartment";
import RoommateDetail from "./components/listing/RoommateDetail";
import CreateRoommate from "./components/listing/CreateRoommate";

// Dashboard
import Dashboard from "./components/dashboard/dashboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/apartments" element={<ApartmentSearch />} />
              <Route path="/apartments/:id" element={<ApartmentDetail />} />
              <Route path="/roommates" element={<RoommateSearch />} />
              <Route path="/roommates/:id" element={<RoommateDetail />} />

              {/* Protected Routes */}
              <Route
                path="/quiz"
                element={
                  <ProtectedRoute>
                    <QuizForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-listings"
                element={
                  <ProtectedRoute>
                    <MyListings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/apartments/create"
                element={
                  <ProtectedRoute>
                    <CreateApartment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roommates/create"
                element={
                  <ProtectedRoute>
                    <CreateRoommate />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
