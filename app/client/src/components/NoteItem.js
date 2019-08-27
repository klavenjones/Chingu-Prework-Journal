import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const NoteItem = ({ post, getUser }) => {
  const onDeleteClick = id => {
    axios.delete(`/post/${id}`).then(response => {
      getUser();
    });
  };
  return (
    <Fragment>
      <div className="col-md-4 my-3">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">{post.title}</h5>
          </div>
          <div className="card-body">
            <p className="card-text">{post.text}</p>
          </div>
          <div className="card-footer">
            <Link
              className="btn btn-warning w-auto mr-2"
              to={{
                pathname: "/edit-note",
                state: { post: post }
              }}
            >
              Edit
            </Link>
            <button
              className="btn btn-danger w-auto"
              onClick={onDeleteClick.bind(this, post._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { NoteItem };
