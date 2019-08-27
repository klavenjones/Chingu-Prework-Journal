import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NoteForm, NoteList } from "./";

const Home = ({ isLoggedIn, user, getUser }) => {
  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, []);

  const homeContent = isLoggedIn ? (
    <Fragment>
      <div className="row h-100 align-items-center py-5">
        <h5 className="w-100 display-4 text-center mb-5">
          Welcome, {user.name}
        </h5>
        <NoteForm getUser={getUser} />
        <NoteList posts={user.posts} getUser={getUser} />
      </div>
      <div className="row text-left"></div>
    </Fragment>
  ) : (
    <div className="row h-100 align-items-center py-5">
      <div className="col-12 text-center">
        <h1 className="mb-5">Hello, welcome to the Journal App</h1>
        <div className="my-5">
          <p className="lead mb-0">
            Welcome back, Please log in to access your notes
          </p>
          <Link to="/login">Log In</Link>
        </div>
        <div>
          <p className="lead mb-0">No account yet? No worries sign up!</p>
          <Link to="/register">Sign Up </Link>
        </div>
      </div>
    </div>
  );

  return <Fragment>{homeContent}</Fragment>;
};

export { Home };
