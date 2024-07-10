import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import "./Styles /Navbar.css";

const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["theme", "name", "pass"]);
  const [theme, setTheme] = useState(cookies.theme || "light");
  const [name, setName] = useState(cookies.name || "");

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
    setCookie("theme", newTheme, { path: "/" });
  };

  const logout = () => {
    removeCookie("pass", { path: "/" });
    removeCookie("name", { path: "/" });
  };

  return (
    <Navbar expand="md" bg={theme} variant={theme} className={`navbar-${theme} zindex-2000`}>
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          {name ? name : "Cloud Storage"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center icon-size ">
            <Nav.Link as={Link} to="/home" className={`align-items-center mx-2 text-${theme === "light"?"dark":"light"}`}>
              <IoIosHome />
            </Nav.Link>
            <Button
              variant="outline-light"
              onClick={toggleTheme}
              className={`theme-box icon-size mx-2 text-${theme === "light" ? "dark" : "light"}`}
            >
              {theme === "light" ? <RiMoonFill /> : <RiSunFill />}
            </Button>
          </Nav>
          <Nav className="ml-auto d-flex icon-size align-items-center navbar-icons">
            {cookies.pass ? (
              <Button
                variant="outline-light"
                onClick={logout}
                className={`theme-box text-danger mx-2`}
              >
                <CiLogout />
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login" className={`align-items-center icon-size mx-2 text-${theme === "light"?"dark":"light"}`}>
                <IoLogInOutline />
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/admin-panel" className={`align-items-center icon-size mx-2 `}>
              <GrUserAdmin />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;