// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Home from './Components /Home.jsx';
import NavBar from './Components /Layout /Navbar.jsx';
import AdminPanel from './App/AdminPanel';
import Login from './Components /Login.jsx';
import ProtectedRoute from './App/ProtectedRoute.jsx';

function App() {
  const [cookies] = useCookies(['pass', 'name']);
  const isAuthenticated = cookies.pass || cookies.name;

  return (
    <div>
      <Router>
        <div>
          <div style={{ position: "fixed", width: "100%" }}>
            <NavBar />
          </div>
          <div style={{ height: 3, width: "100%" }} className="bg-primary"></div>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
            />
            <Route
              path="/home"
              element={<ProtectedRoute><Home /></ProtectedRoute>}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/admin-panel"
              element={<ProtectedRoute><AdminPanel /></ProtectedRoute>}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;