import React, { Fragment, useState } from "react";

export default function Form(props) {
  const [titulo, setTitulo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.addTarea(titulo);
    setTitulo("");
  }

  function handleChange(e) {
    setTitulo(e.target.value);
  }

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
          value={titulo}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn__primary btn__lg"
          onClick={handleSubmit}
        >
          Agregar
        </button>
      </form>
    </Fragment>
  );
}
