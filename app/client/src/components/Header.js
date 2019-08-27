import React, { Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Header = ({ isLoggedIn, updateCurrentUser }) => {
  const logOut = e => {
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          updateCurrentUser({
            loggedIn: false,
            user: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  };

  const navLinks = isLoggedIn ? (
    <Fragment>
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      {/* <li className="nav-item">
        <Link className="nav-link" to="/login">
          
        </Link>
      </li> */}
      <li className="nav-item">
        <button onClick={logOut} className="btn btn-link nav-link">
          Logout
        </button>
      </li>
    </Fragment>
  ) : (
    <Fragment>
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          My Journal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">{navLinks}</ul>
        </div>
      </nav>
    </Fragment>
  );
};

export { Header };
