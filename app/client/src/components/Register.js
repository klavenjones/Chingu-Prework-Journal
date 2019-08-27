import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    name: ""
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
      .post("/user/create", {
        email: state.email,
        password: state.password,
        name: state.name
      })
      .then(response => {
        if (response.status === 201) {
          //Set redirect Link
          setLink("/login");
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
            <h1 className="mb-5">Register</h1>
            <div className="login text-left w-75 align-self-center">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </div>
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

export { Register };
