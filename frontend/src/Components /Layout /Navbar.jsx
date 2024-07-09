import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import './Styles /Navbar.css'

const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['theme', 'name', 'pass']);
  const [theme, setTheme] = useState(cookies.theme || "light");
  const [name, setName] = useState(cookies.name || '');

  useEffect(() => {
    if (cookies.theme) {
      setTheme(cookies.theme);
    }
    if (cookies.name) {
      setName(cookies.name);
    }
  }, [cookies]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie('theme', newTheme, { path: '/' });
  };

  const logout = () => {
    removeCookie('pass', { path: '/' });
    removeCookie('name', { path: '/' });
  };

  return (
    <Navbar bg={theme === "light" ? "light" : "dark"} expand="sm" className={`navbar-${theme === "light" ? "light" : "dark"} zindex-2000`}>
      <Navbar.Brand>{`Cloud Storage `||name}</Navbar.Brand>
      <button onClick={toggleTheme} className={`theme-box text-${theme === "light"?"dark":"light"}`} style={{ right: '70px' }}>
        {theme === "light" ? <RiMoonFill /> : <RiSunFill />}
      </button>
      <div className="position-absolute" style={{ right: '30px', fontSize: '1.5em' }}>
        <Nav className={`mr-auto text-${theme === "light" ? "dark" : "light"}`}>
          {cookies.pass ? (
            <>
              <button  style={{ right: 90, top: 6 }} className="text-danger border-0 bg-transparent position-absolute" onClick={logout}><CiLogout /></button>
              <Nav.Link href="/home"><IoIosHome /></Nav.Link>
            </>
          ) : (
            <Nav.Link href="/login"><IoLogInOutline /></Nav.Link>
          )}
          <Link to="/about"><button><FcAbout /></button></Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
