import React, { Fragment, useState } from "react";

export default function Form(props) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [userId, setUserId] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    props.addTarea(titulo, descripcion, userId);
    setTitulo("");
    setDescripcion("");
    //setUserId("");
  }

  function handleChange(e) {
    if (e.target.id.includes("titulo")) {
      setTitulo(e.target.value);
    }else if(e.target.id.includes("descripcion")) {
      setDescripcion(e.target.value);
    }
  }

  return (
    <Fragment>
      <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Que tarea tiene pendiente?
          </label>
        </h2>
        <h3 className="label-wrapper">
          <label htmlFor="new-todo-input" className="">
            Titulo:
          </label>
        </h3>
        <input
          type="text"
          id="new-todo-input-titulo"
          className="input input__lg"
          name="text-titulo"
          autoComplete="off"
          value={titulo}
          onChange={handleChange}
        />
        <h3 className="label-wrapper">
          <label htmlFor="new-todo-input" className="">
            Descripcion:
          </label>
        </h3>
        <input
          type="text"
          id="new-todo-input-descripcion"
          className="input input__lg"
          name="text-descripcion"
          autoComplete="off"
          value={descripcion}
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
