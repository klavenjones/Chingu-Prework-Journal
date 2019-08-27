import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
const NoteForm = ({ getUser }) => {
  const [state, setState] = useState({ text: "", title: "" });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newPost = {
      text: state.text,
      title: state.title
    };
    axios.post("/post/create", newPost).then(response => {
      getUser();
    });
  };

  return (
    <Fragment>
      <div className="col-12 text-left">
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
              Create a journal entry with this form.
            </small>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export { NoteForm };
