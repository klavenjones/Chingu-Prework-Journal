import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Alert } from "./";
import FormValidator from "../validation/FormValidator";

const Login = ({ updateCurrentUser }) => {
  //SET UP FORM CRITERIA
  const validator = new FormValidator([
    {
      field: "email",
      method: "isEmpty",
      validWhen: false,
      message: "Email is required."
    },
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: "That is not a valid email."
    },
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "Password is required."
    }
  ]);
  //STATE WILL HANDLE USER INPUT AND ERRORS
  const [state, setState] = useState({
    email: "",
    password: "",
    validation: validator.valid(),
    errors: {}
  });
  //REDIRECT LINK FOR SUCCESSFUL LOGIN IT WILL REDIRECT USER TO HOME PAGE
  const [redirectLink, setLink] = useState(null);
  //CHECK TO SEE IF USER SUBMITTED AND MADE A REQUEST
  let submitted;
  //WHEN COMPONENT MOUNTS THIS WILL REINITIALIZE THE VARIABLES
  useState(() => {
    submitted = false;
  }, []);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    //handle validation
    setState({ ...state, validation: true });
    const formValidation = validator.validate(state);
    setState({ ...state, validation: formValidation });
    submitted = true;
    //ONCE FORM IS VALID IT WILL MAKE THE REQUEST
    if (formValidation.isValid) {
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

            setState({ ...state, validation: validator.valid() });
            //Set redirect Link
            setLink("/");
          }
        })
        .catch(err => {
          if (err.response.headers["www-authenticate"]) {
            setState({
              ...state,
              validation: validator.valid(),
              errors: { message: err.response.headers["www-authenticate"] }
            });
          }
        });
    }
  };

  const onClick = e => {
    if (e.target.getAttribute("data-name") === "error") {
      setState({ ...state, errors: {} });
    }
  };

  //IF THE USER HAS SUBMITTED ATLEAST ONCE
  //THEN WE CHECK VALIDITY
  // ELSE WE JUST USE WHATS IN THE STATE

  let validation = submitted ? validator.validate(state) : state.validation;

  if (redirectLink) {
    return <Redirect to={{ pathname: redirectLink }} />;
  } else {
    return (
      <Fragment>
        {/* THIS WILL APPEAR WHEN THERE IS A SERVER ERROR */}
        {state.errors.message ? (
          <Alert name="error" error={state.errors.message} onClick={onClick} />
        ) : (
          <div />
        )}

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
                    className={`form-control ${validation.email.isInvalid &&
                      "is-invalid"}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                  />
                  <span className="invalid-feedback">
                    {validation.email.message}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${validation.password.isInvalid &&
                      "is-invalid"}`}
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <span className="invalid-feedback">
                    {validation.password.message}
                  </span>
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
