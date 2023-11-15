import React, { Fragment } from "react";

export default function FilterButton(props) {
  return (
    <Fragment>
      <button
        type="button"
        className="btn toggle-btn"
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.titulo)}
      >
        <span className="visually-hidden">Show </span>
        <span>{props.titulo}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    </Fragment>
  );
}
