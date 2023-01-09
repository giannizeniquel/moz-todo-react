import React, { Fragment } from "react";

export default function Todo(props) {
    return (
        <Fragment>
            <li className="todo stack-small">
                <div className="c-cb">
                    <input 
                        id={props.id} 
                        type="checkbox" 
                        defaultChecked={props.completed}
                        onChange={()=>props.toggleTaskCompleted(props.id)}
                    />
                    <label className="todo-label" htmlFor={props.id}>
                        {props.name}
                    </label>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn">
                        Editar <span className="visually-hidden">{props.name}</span>
                    </button>
                    <button 
                        type="button" 
                        className="btn btn__danger"
                        onClick={()=>{props.deleteTask(props.id)}}
                    >
                        Eliminar <span className="visually-hidden">{props.name}</span>
                    </button>
                </div>
            </li>
        </Fragment>
    );
}