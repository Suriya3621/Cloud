import React from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './Components/Layout/Navbar'; // Adjust the path if necessary
import Login from './Components/Login';
import Home from './Components/Home';
import AdminPanel from './App/AdminPanel'
function App() {
  const [passCookies] = useCookies(['pass']);

  return (
    <Router>
      <div>
      <AdminPanel/>
      {
//         <div style={{ position:"fixed",width:"100%"}}>
//         <NavBar />
//       </div>
//         <div style={{ height: 3, width: "100%", backgroundColor: "blue" }}></div>
//         <Routes>
//           <Route
//             path="/"
//             element={passCookies.pass ? <Navigate to="/home" /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/home"
//             element={passCookies.pass ? <Home /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/login"
//             element={passCookies.pass ? <Navigate to="/home" /> : <Login />}
//           />
//         </Routes>
      }
      </div>
    </Router>
  );
}

export default App;
