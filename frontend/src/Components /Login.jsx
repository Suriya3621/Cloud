import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Styles /Login.css';
import HelmetConfig from '../App/HelmetConfig.jsx'
const Login = () => {
  const [cookies] = useCookies(['theme']);
  const [, setCookie] = useCookies(['pass']);
  const [theme, setTheme] = useState(cookies.theme || 'light');
  const [pass, setPass] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setTheme(cookies.theme || 'light');
  }, [cookies]);

  const redirectFunctionHandle = (e) => {
    e.preventDefault();
    console.log('success');
    if (pass) {
      setRedirect(true);
      setCookie('pass', pass);
    } else {
      alert('Please enter your pass');
    }
  }

  if (redirect) {
    return <Navigate to="/home" />;
  }
  return (
    <div className={`d-flex justify-content-center align-items-center ${theme} vh-100`}>
    <HelmetConfig
      title="Login"
      icon="/Icons/login.png"
    />
      <form className={`bg-login-box rounded bg-${theme} text-${theme === 'light'?"dark":"light"}form-control`} onSubmit={redirectFunctionHandle}>
        <div className="text-center display-6 mb-3">
          <p>Login with your password</p>
        </div>
        <div className="mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            id="myPass"
            className="border-gradient border-gradient-purple form-control myInput"
            placeholder="Enter your pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <input 
            type="checkbox" 
            onChange={() => setShowPassword(!showPassword)}
          /> Show Pass
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
