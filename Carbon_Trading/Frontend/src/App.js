import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, useLocation, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import About from './Pages/About';
import ContactUs from './Components/Contact';
import Sellers from './Components/Sellers';
import SellersList from './Components/SellersList';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import SignupForm from './Pages/SignupForm';
import Notification from './Pages/Notification';

// Component to protect routes
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the token exists
  console.log("Token from localStorage:", token); // Debugging line

  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const location = useLocation();

  // Define routes where the header should not be shown
  const hideHeaderRoutes = ['/', '/login', '/signup'];

  // Monitor token changes on app load for debugging
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token on App load:", token);
  }, []);

  return (
    <>
      {/* Conditionally render the Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Welcome />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<SignupForm />} exact />
        
        {/* Protected routes */}
        <Route 
          path="/home" 
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } 
          exact 
        />
        <Route 
          path="/about" 
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          } 
          exact 
        />
        <Route 
          path="/contact" 
          element={
            <RequireAuth>
              <ContactUs />
            </RequireAuth>
          } 
          exact 
        />
        <Route 
          path="/seller" 
          element={
            <RequireAuth>
              <Sellers />
            </RequireAuth>
          } 
          exact 
        />
        <Route 
          path="/sellerlist" 
          element={
            <RequireAuth>
              <SellersList />
            </RequireAuth>
          } 
          exact 
        />
        <Route 
          path="/profile" 
          element={
            <RequireAuth>
              <Profile />
              </RequireAuth>
          } 
          exact 
        />
        <Route 
          path="/notification" 
          element={
            <RequireAuth>
              <Notification />
            </RequireAuth>
          } 
          exact 
        />
      </Routes>
      <Footer />
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
