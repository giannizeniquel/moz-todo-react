import React, { Fragment, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newTitulo, setNewTitulo] = useState('');
  const [newDescripcion, setNewDescripcion] = useState('');

  function handleChange(e) {
    setNewTitulo(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    props.editTarea(props.id, newTitulo);
    setNewTitulo("");
    setEditing(false);
  }

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
    <Fragment>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14, fontStyle: "italic" }} color="text.secondary" gutterBottom>
            {props.fechaCreacion}
          </Typography>
          <Typography variant="h5" component="div" id={'titulo_tarea_'+props.id}>
            {props.titulo}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            
          </Typography>
          <Typography variant="body2">
            {props.descripcion}
          </Typography>
          <br />
          <Checkbox
            id={'check_tarea_'+props.id}
            checked={props.terminada}
            onChange={() => props.toggleTaskCompleted(props.id)}
            tabIndex={-1}
            disableRipple
          />
          completado
        </CardContent>

        <CardActions>
          <ButtonGroup>
            <Button onClick={() => setEditing(true)} color="secondary">
              Editar
            </Button>
            <Button onClick={() => { props.deleteTarea(props.id); }} color="error">
              Eliminar
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      <br/>
    </Fragment>
  );
  return <Fragment>{isEditing ? editingTemplate : viewTemplate}</Fragment>;
}
