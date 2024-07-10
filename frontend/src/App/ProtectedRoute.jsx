// src/components/ProtectedRoute.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const ProtectedRoute = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password === '3621') { // Replace '3621' with the actual password
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <LoginContainer>
      <Title>Admin Login</Title>
      <PasswordInput
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
      />
      <LoginButton onClick={handleLogin}>Login</LoginButton>
    </LoginContainer>
  );
};

export default ProtectedRoute;

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const PasswordInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;