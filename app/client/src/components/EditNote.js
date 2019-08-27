import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const EditNote = ({ location }) => {
  const { text, title, _id } = location.state.post;
  const [state, setState] = useState({
    id: _id,
    text: text,
    title: title
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
    const updatedPost = {
      text: state.text,
      title: state.title
    };

    axios.put(`/post/${_id}`, updatedPost).then(response => {
      setLink("/");
    });
  };
  if (redirectLink) {
    return <Redirect to={{ pathname: redirectLink }} />;
  } else {
    return (
      <Fragment>
        <div className="row justify-content-center">
          <div className="col-md-8 text-left my-5">
            <h5>Edit Note</h5>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={handleChange}
                  value={state.title || ""}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Body</label>
                <textarea
                  name="text"
                  className="form-control"
                  onChange={handleChange}
                  value={state.text || ""}
                  id="exampleInputPassword1"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Edit a journal entry with this form.
                </small>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Edit Note
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
};

export { EditNote };
