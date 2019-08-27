import React from "react";
import classnames from "classnames";

const Alert = ({ error, success, onClick, name, expired }) => {
  return (
    <div className="row justify-content-md-center my-3">
      <div className="col-md-10">
        <div
          className={classnames(
            "alert alert-dismissible fade show",
            {
              "alert-danger": error
            },
            { "alert-success": success }
          )}
          role="alert"
        >
          {success ? success : error}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            data-name={name}
            onClick={onClick}
          >
            <span data-name={name} aria-hidden="true">
              &times;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Alert };
