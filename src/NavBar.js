import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <div>
        <span>
          <Link to="/">Home</Link>&nbsp;
        </span>
        <span>
          <Link to="/standings">Standings</Link>&nbsp;
        </span>
    </div>
  );
};

export default NavBar;