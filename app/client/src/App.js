import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";
//Components
import { Header, Home, Login, Register, EditNote } from "./components";

const App = () => {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null
  });

  useEffect(() => {
    getUser();
  }, []);

  const { isAuthenticated, user } = state;

  const getUser = () => {
    axios.get("/user/").then(response => {
      if (response.data.user) {
        const { posts, name } = response.data.user;
        const currentUser = {
          posts: posts,
          name: name
        };
        setState({
          isAuthenticated: true,
          user: currentUser
        });
      } else {
        setState({
          isAuthenticated: false,
          user: null
        });
      }
    });
  };

  const updateCurrentUser = userObj => {
    setState({
      ...userObj
    });
  };

  return (
    <div className="App">
      <Header
        isLoggedIn={isAuthenticated}
        updateCurrentUser={updateCurrentUser}
      />
      <div className="container-fluid px-0">
        <Route
          exact
          path="/"
          render={() => (
            <Home isLoggedIn={isAuthenticated} user={user} getUser={getUser} />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => <Login updateCurrentUser={updateCurrentUser} />}
        />
        <Route exact path="/register" render={() => <Register />} />

        <Route exact path="/edit-note" component={withRouter(EditNote)} />
      </div>
    </div>
  );
};

export default App;
