import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Alert } from "./";
import FormValidator from "../validation/FormValidator";

const Register = () => {
  //SET UP FORM VALIDATION CRITERIA
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
    },
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "Name is required."
    }
  ]);

  //COMPONENT STATE FOR FORM INPUT
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    validation: validator.valid(),
    errors: {}
  });

  //REDIRECT LINK. UPON SUCCESSFUL REGISTRATION THIS SHOULD REDIRECT USER TO LOGIN PAGE
  const [redirectLink, setLink] = useState(null);

  //CHECK TO SEE IF USER SUBMITTED THE FORM
  let submitted;

  //THIS WILL SET VARIABLES ONCE AFTER IT MOUNTS
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
    //CLEAR ERRORS
    setState({ ...state, validation: true });
    const formValidation = validator.validate(state);
    setState({ ...state, validation: formValidation });
    submitted = true;
    //IF FORM IS VALID THIS WILL MAKE THE REQUEST TO THE SERVER
    if (formValidation.isValid) {
      axios
        .post("/user/create", {
          email: state.email,
          password: state.password,
          name: state.name
        })
        .then(response => {
          if (response.status === 201) {
            //CLEAR ERRORS
            setState({ ...state, validation: validator.valid() });
            //Set redirect Link
            setLink("/login");
          }
        })
        .catch(err => setState({ ...state, errors: err.response.data }));
    }
  };

  //CLEAR ERRORS
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
        {state.errors.message ? (
          <Alert name="error" error={state.errors.message} onClick={onClick} />
        ) : (
          <div />
        )}
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
                    className={`form-control ${validation.name.isInvalid &&
                      "is-invalid"}`}
                    id="name"
                    required
                    placeholder="Name"
                    onChange={handleChange}
                  />
                  <span className="invalid-feedback">
                    {validation.name.message}
                  </span>
                </div>
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
                    required
                    onChange={handleChange}
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

export { Register };
