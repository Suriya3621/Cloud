// src/App.js
import React from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components /Home.jsx';
import NavBar from './Components /Layout /Navbar.jsx';
import AdminPanel from './App/AdminPanel';

import Login from './Components /Login.jsx';
function App() {
 const [cookies] = useCookies(['pass' ,'name']);

  return ( 
    <div>
    <Router>
      <div>
        <div style={{ position: "fixed", width: "100%" }}>
          <NavBar />
        </div>
      <div style={{height:3,width:"100%"}} className="bg-primary">
      </div>
        <Routes>
          <Route
            path="/"
            element={cookies.pass || cookies.name ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={cookies.pass  || cookies.name ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={cookies.pass || cookies.name ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/admin-panel"
            element={<AdminPanel />}
          />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;