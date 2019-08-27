import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { NoteForm, NoteList } from "./";

const Home = ({ isLoggedIn, user, getUser }) => {
  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const homeContent = isLoggedIn ? (
    <Fragment>
      <div className="row h-100 align-items-center justify-content-center py-5">
        <div className="col-md-10">
          <h5 className="w-100 display-4 text-center mb-5">
            Welcome, {user.name}
          </h5>
          <NoteForm getUser={getUser} />
          <NoteList posts={user.posts} getUser={getUser} />
        </div>
      </div>
      <div className="row text-left"></div>
    </Fragment>
  ) : (

    <header className="masthead w-100">
      <div className="row h-100 align-items-center">
        <div className="col-12 text-center">
          <h1 className="display-2 font-weight-bold">The Journal App</h1>
          <div className="col-md-6 mx-auto d-flex justify-content-center mt-5">
            <Link className="btn btn-success mr-5 w-25" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary w-25" to="/login">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );

  return <Fragment>{homeContent}</Fragment>;
};

export { Home };
