import React from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import AdminPanel from './App/AdminPanel.jsx';
import NavBar from './Components/Layout/Navbar.jsx';

function App() {
  const [cookies] = useCookies(['pass']);

  return (
    <Router>
      <div>
        <AdminPanel />
        <div style={{ position: "fixed", width: "100%" }}>
          <NavBar />
        </div>
        <div style={{ height: 3, width: "100%", backgroundColor: "blue" }}></div>
        <Routes>
          <Route 
            path="/" 
            element={cookies.pass ? <Navigate to="/home" /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/home" 
            element={cookies.pass ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={cookies.pass ? <Navigate to="/home" /> : <Login />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
