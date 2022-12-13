import React, { Fragment } from "react";

export default function Form (props) {
    return (
        <Fragment>
            <form>
                <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    Que tarea tiene pendiente?
                </label>
                </h2>
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                />
                <button type="submit" className="btn btn__primary btn__lg">
                    Agregar
                </button>
            </form>
        </Fragment>
    )
}