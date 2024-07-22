import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled, { createGlobalStyle } from 'styled-components';
import HelmetConfig from '../App/HelmetConfig.jsx';

const GlobalStyle = createGlobalStyle`

  body,
  html {
    height: 100%;
    margin: 0;
  }

  .dark {
    background-color: #2E3042;
    color: white;
  }

  .light {
    background-color: #DCDDEA;
    color: black;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme === 'light' ? '#DCDDEA' : '#2E3042'};
  color: ${props => props.theme === 'light' ? 'black' : 'white'};
`;

const Form = styled.form`
  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;
  border: none;
  width: 100%;
  border-radius: 10px;
  max-width: 300px;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
  transition: max-width 0.3s ease, padding 0.3s ease;
  background-color: ${props => props.theme === 'light' ? '#fff' : '#495057'};
  color: ${props => props.theme === 'light' ? '#000' : '#fff'};
  
  @media (min-width: 768px) {
    max-width: 400px;
    padding: 30px;
  }

  @media (min-width: 992px) {
    max-width: 500px;
    padding: 40px;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-decoration-style: thin;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 3px;
  border: none;
  transition: all 0.4s ease;

  &:hover {
    outline: none;
    box-shadow: 0 0 10px rgba(116, 58, 213, 0.7), 0 0 20px rgba(213, 58, 157, 0.7);
    animation: borderGlow 1.5s infinite;
  }

  @keyframes borderGlow {
    0%,
    100% {
      box-shadow: 0 0 10px rgba(116, 58, 213, 0.7), 0 0 20px rgba(213, 58, 157, 0.7);
    }

    50% {
      box-shadow: 0 0 20px rgba(116, 58, 213, 1), 0 0 40px rgba(213, 58, 157, 1);
    }
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Button = styled.button`
  width: 80%;
  margin-left: 10%;
  padding: 0.5rem;
  background-color: #3fbd30;
  color: #fff;
  border: none;
  border-radius: 17px;
  cursor: pointer;

  &:hover {
    background-color: #217f15;
  }
`;

const TypeText = styled.div`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  font-family: monospace;
  font-size: 1.5em;
  border-right: 3px solid black;
  animation: blink 0.7s steps(1) infinite;
  margin-bottom: 1rem;
  
  @media screen and (min-width: 700px) {
    font-size: 3em;
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
`;

const Login = () => {
  const [cookies] = useCookies(['theme']);
  const [, setCookie] = useCookies(['pass']);
  const [theme, setTheme] = useState(cookies.theme || 'light');
  const [pass, setPass] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100; // milliseconds
  const deletingSpeed = 50; // milliseconds
  const pauseBetween = 1000; // milliseconds

  useEffect(() => {
    const texts = ["Welcome to Cloud storage.", "You can access files anyware.", "Login now!"];

    const handleTyping = () => {
      if (!isDeleting && charIndex < texts[textIndex].length) {
        setCurrentText(text => text + texts[textIndex].charAt(charIndex));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(text => text.slice(0, -1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === texts[textIndex].length) {
        setTimeout(() => setIsDeleting(true), pauseBetween);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  useEffect(() => {
    setTheme(cookies.theme || 'light');
  }, [cookies]);

  const redirectFunctionHandle = (e) => {
    e.preventDefault();
    if (pass) {
      setRedirect(true);
      setCookie('pass', pass);
    } else {
      alert('Please enter your pass');
    }
  };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <GlobalStyle />
      <Container theme={theme}>
        <HelmetConfig
          title="Login"
          icon="/Icons/login.png"
        />
        <TypeText>{currentText}</TypeText>
        <Form theme={theme} onSubmit={redirectFunctionHandle}>
          <Title>
            <p>Login with your password</p>
          </Title>
          <div>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <div>
              <Checkbox 
                type="checkbox" 
                onChange={() => setShowPassword(!showPassword)}
                checked={showPassword}
              /> {showPassword ? "Hide" : "Show"}
            </div>
          </div>
          <div>
            <Button type="submit">
              Enter
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;