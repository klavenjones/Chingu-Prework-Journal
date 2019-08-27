import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Login = ({ updateCurrentUser }) => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const [redirectLink, setLink] = useState(null);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("/user/login", {
        email: state.email,
        password: state.password
      })
      .then(response => {
        if (response.status === 200) {
          updateCurrentUser({
            isAuthenticated: true,
            user: response.data.user
          });
          //Set redirect Link
          setLink("/");
        }
      });
  };
  if (redirectLink) {
    return <Redirect to={{ pathname: redirectLink }} />;
  } else {
    return (
      <Fragment>
        <div className="row h-100 py-5 justify-content-center">
          <div className="col-md-8 d-flex flex-column text-center">
            <h1 className="mb-5">Log In</h1>
            <div className="login text-left w-75 align-self-center">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export { Login };
