import React, { Fragment, useState } from "react";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newTitulo, setNewTitulo] = useState('');

  function handleChange(e) {
    setNewTitulo(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    props.editTarea(props.id, newTitulo);
    setNewTitulo("");
    setEditing(false);
  }
console.log(props.terminada);
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          Nuevo nombre para: <strong>{props.titulo}</strong>
        </label>
        <input 
            id={props.id} 
            className="todo-text" 
            type="text"
            value={newTitulo}
            onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancelar
          <span className="visually-hidden">renaming {props.titulo}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Guardar
          <span className="visually-hidden">new name for {props.titulo}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.terminada}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.titulo}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Editar <span className="visually-hidden">{props.titulo}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => {
            props.deleteTarea(props.id);
          }}
        >
          Eliminar <span className="visually-hidden">{props.titulo}</span>
        </button>
      </div>
    </li>
  );
  //return <Fragment>{editingTemplate }</Fragment>;
  return <Fragment>{isEditing ? editingTemplate : viewTemplate}</Fragment>;
}
