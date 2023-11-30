import React, { Fragment, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';


export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newTitulo, setNewTitulo] = useState('');
  const [newDescripcion, setNewDescripcion] = useState('');

  function handleChange(e) {
    if (e.target.id.includes("titulo")) {
      setNewTitulo(e.target.value);
    }else if(e.target.id.includes("descripcion")) {
      setNewDescripcion(e.target.value);
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    props.editTarea(props.id, newTitulo, newDescripcion);
    setNewTitulo("");
    setNewDescripcion("");
    setEditing(false);
  }

  const editingTemplate = (
    <Fragment>
      <Box component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '35ch'},
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Card variant="outlined">
          <CardContent>
            <TextField
              id="outlined-required-titulo"
              label="Editar Titulo"
              name="text-titulo"
              autoComplete="off"
              value={newTitulo}
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-required-descripcion"
              label="Editar Descripcion"
              name="text-descripcion"
              autoComplete="off"
              value={newDescripcion}
              onChange={handleChange}
              required
              multiline
            />
          </CardContent>
          <CardActions>
            <Stack direction="row" spacing={1}>
              <Button 
                onClick = {() => { setEditing(false); setNewTitulo(""); setNewDescripcion(""); }}
                color="primary"
                title="Cancelar"
                variant="outlined"
              >
                <UndoIcon />
              </Button>
              <Button type="success" color="primary" title="Guardar" variant="outlined">
                <CheckCircleIcon />
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Box>
      <br/>
    </Fragment>
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
          <Stack direction="row" spacing={1}>
            <Button onClick={() => setEditing(true)} color="primary" title="Editar" variant="outlined">
              <EditNoteIcon />
            </Button>
            <Button onClick={() => { props.deleteTarea(props.id); }} color="primary" title="Eliminar" variant="outlined">
              <DeleteIcon />
            </Button>
          </Stack>
        </CardActions>
      </Card>
      <br/>
    </Fragment>
  );
  return <Fragment>{isEditing ? editingTemplate : viewTemplate}</Fragment>;
}
