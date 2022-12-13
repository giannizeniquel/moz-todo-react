import React, { Fragment } from "react";

export default function FilterButton (props) {
    return (
        <Fragment>
            <button type="button" className="btn toggle-btn" aria-pressed="true">
                <span className="visually-hidden">Show </span>
                <span>Todas</span>
                <span className="visually-hidden"> tasks</span>
            </button>
        </Fragment>
    )
}