import React from "react";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";

const NavBar = () => {

  return (
    <Navbar bg="light">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/standings" className="nav-link">Standings</NavLink>
    </Navbar>
  );
};

export default NavBar;