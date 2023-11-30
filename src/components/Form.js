import React, { Fragment, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

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
    <Box component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '40ch'},
        '& .MuiButton-root': { m: 1, width: '15ch'},
      }}
      autoComplete="off"
    >
      <div>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Que tarea tiene pendiente?
          </label>
        </h2>
      </div>
      <div>
        <TextField
          id="outlined-required-titulo"
          label="Titulo"
          name="text-titulo"
          autoComplete="off"
          value={titulo}
          onChange={handleChange}
          required
        />
      </div> 
      {/* <h3 className="label-wrapper">
        <label htmlFor="new-todo-input" className="">
          Descripcion:
        </label>
      </h3> */}
      
      <div>
        <TextField
          id="outlined-required-descripcion"
          label="Descripcion"
          name="text-descripcion"
          autoComplete="off"
          value={descripcion}
          onChange={handleChange}
          required
          multiline
        />
      </div>  
      <div>
        <Button
          variant="contained"
          type="success"
          onClick={handleSubmit}
          endIcon={<AddIcon />}
        >
          Agregar
        </Button>
      </div>
      <br/>
    </Box>
  );
}
