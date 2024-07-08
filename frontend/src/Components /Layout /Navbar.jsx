import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

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
      <Button variant={theme === "light" ? "dark" : "light"} onClick={toggleTheme} className="position-absolute" style={{ right: '70px' }}>
        {theme === "light" ? <RiMoonFill /> : <RiSunFill />}
      </Button>
      <div className="position-absolute" style={{ right: '30px', fontSize: '1.5em' }}>
        <Nav className={`mr-auto text-${theme === "light" ? "dark" : "light"}`}>
          {cookies.pass ? (
            <>
              <Button variant="danger" style={{ right: 90, top: 6 }} className="position-absolute" onClick={logout}><CiLogout /></Button>
              <Nav.Link href="/home"><IoIosHome /></Nav.Link>
            </>
          ) : (
            <Nav.Link href="/login"><IoLogInOutline /></Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
