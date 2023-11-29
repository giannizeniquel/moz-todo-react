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

  function editTarea(id, newTitulo) {
    const editedTaskList = tareas.map((tarea) => {
      if (id === tarea.id) {
        return { ...tarea, titulo: newTitulo };
      }
      return tarea;
    });
    setTareas(editedTaskList);
  }

  //recorro matriz de tareas que fue declarada en Index.js y recibo en props como tareas, renderizo Componente Todo segun el filtro seleccionado
    const taskList = tareas.filter(FILTER_MAP[filter]).map((tarea) => (
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
    ));               

  const filterList = FILTER_NAMES.map((titulo) => {
    return (
      <ToggleButton value={titulo} key={titulo} color="success">
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
      <h1>Administrar Tareas</h1>
      <Form addTarea={addTarea} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
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
      </Box>
      <h2 id="list-heading">{headingText}</h2>
      <Suspense fallback={<div className="container-loading"><Hypnosis width="50px" height="50px" duration="3s" /></div>}>
          {/* muestro constante que contiene mi mapeo con mis tareas */}       
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {taskList}
          </List>
      </Suspense>
    </Fragment>
  );
}

export default App;
