import React, { Fragment, useState } from "react";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);

  const editingTemplate = (
    <form className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          Nuevo nombre para: <strong>{props.name}</strong>
        </label>
        <input id={props.id} className="todo-text" type="text" />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancelar
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Guardar
          <span className="visually-hidden">new name for {props.name}</span>
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
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Editar <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => {
            props.deleteTask(props.id);
          }}
        >
          Eliminar <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </li>
  );

  return <Fragment>{isEditing ? editingTemplate : viewTemplate}</Fragment>;
}
