import React, { Fragment, useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { fetchGetTareas, fetchCreateTarea, fetchDeleteTarea, fetchUpdateTarea } from "./fetchData"; // peticiones a la api de tareas
import { Suspense } from "react"; // componente nativo, me ayuda a esperar mis peticiones y mostrar el spinner
import { Hypnosis } from "react-cssfx-loading"; // componente nativo para mostrar spinner
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Filter } from "@mui/icons-material";
import ButtonAppBar from './components/NavBar';
import Grid from '@mui/material/Grid';

const getTareas = fetchGetTareas(1);//el parametro me indica el usuario TODO: pensar dinamismo cuando se tenga el login hecho

const FILTER_MAP = {
  Todas: () => true,
  Activas: (tarea) => !tarea.terminada,
  Terminadas: (tarea) => tarea.terminada,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  let data = getTareas.read();
  const [tareas, setTareas] = useState(data);
  const [filter, setFilter] = useState("Todas");
  const [alignment, setAlignment] = React.useState('Todas');


  async function addTarea(titulo, descripcion, userId = 1) {
    try {
      const newTarea = {
        titulo: titulo, 
        descripcion: descripcion, 
        terminada: false, 
        userId: userId
      };
      // Esperar a que se complete la creación de la tarea
      const response = await fetchCreateTarea(newTarea);

      setTareas([...tareas, response.nueva_tarea]);
  } catch (error) {
      console.error('Error crear tarea:', error);
  }
    
  }

  // Actualizo check de una tarea
  async function toggleTaskCompleted(id) {
    let updateOneTarea;
    const updatedTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        updateOneTarea = { ...tarea, terminada: !tarea.terminada };
        return { ...tarea, terminada: !tarea.terminada };
      }
      return tarea;
    });

    const response = await fetchUpdateTarea(id, updateOneTarea);
    console.log(response);
    setTareas(updatedTareas);
  }

  async function deleteTarea(id) {
    const remainingTasks = tareas.filter((tarea) => id !== tarea.id);
    // Esperar a que se complete la creación de la tarea
    const response = await fetchDeleteTarea(id);
    console.log(response);
    setTareas(remainingTasks);
  }

  async function editTarea(id, newTitulo, newDescripcion) {
    let editOneTarea;
    const editedTaskList = tareas.map((tarea) => {
      if (id === tarea.id) {
        editOneTarea = { ...tarea, titulo: newTitulo, descripcion: newDescripcion, terminada: tarea.terminada };
        return { ...tarea, titulo: newTitulo, descripcion: newDescripcion };
      }
      return tarea;
    });
    const response = await fetchUpdateTarea(id, editOneTarea);
    console.log(response);
    setTareas(editedTaskList);
  }

  //recorro matriz de tareas que fue declarada en Index.js y recibo en props como tareas, renderizo Componente Todo segun el filtro seleccionado
    const taskList = tareas.filter(FILTER_MAP[filter]).map((tarea) => (
      <Grid item xs={12} sm={8} md={6} lg={4} xl={4} key={tarea.id+"_grid"}>
        <Todo
          id={tarea.id}
          titulo={tarea.titulo}
          descripcion={tarea.descripcion}
          terminada={tarea.terminada}
          fechaCreacion={tarea.fechaCreacion}
          key={tarea.id}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTarea={deleteTarea}
          editTarea={editTarea}
        />
      </Grid>
    ));               

  const filterList = FILTER_NAMES.map((titulo) => {
    return (
      <ToggleButton value={titulo} key={titulo} color="primary">
        <FilterButton
          titulo={titulo}
          isPressed={titulo === filter}
          setFilter={setFilter}
        />
      </ToggleButton>
    );
  });

  const tasksNoun = taskList.length !== 1 ? "tareas" : "tarea";
  const headingText = `${taskList.length} ${tasksNoun}`;

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Fragment>
      <ButtonAppBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Tablero de : 'usuario'</h1>
      </Box>
      
      <Form addTarea={addTarea} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ToggleButtonGroup 
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Filter"
        >
          {filterList}
        </ToggleButtonGroup>
        <h2 id="list-heading">{headingText}</h2>
      </Box>
      <Suspense fallback={<div className="container-loading"><Hypnosis width="50px" height="50px" duration="3s" /></div>}>
          {/* muestro constante que contiene mi mapeo con mis tareas */}       
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={4}
            justifyContent="center"
          >
            {taskList}
          </Grid>
        </Box>
      </Suspense>
    </Fragment>
  );
}

export default App;
