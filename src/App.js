import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { fetchGetTareas, fetchCreateTarea } from "./fetchData"; // peticiones a la api de tareas
import { Suspense } from "react"; // componente nativo, me ayuda a esperar mis peticiones y mostrar el spinner
import { Hypnosis } from "react-cssfx-loading"; // componente nativo para mostrar spinner

const getTareas = fetchGetTareas(1);//el parametro me indica el usuario TODO: pensar dinamismo cuando se tenga el login hecho


const FILTER_MAP = {
  Todas: () => true,
  Activas: (tarea) => !tarea.terminada,
  Completadas: (tarea) => tarea.terminada,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  let data = getTareas.read();
  const [tareas, setTareas] = useState(data);
  const [filter, setFilter] = useState("Todas");

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
      console.error('Error adding tarea:', error);
  }
    
  }

  // Actualizo check de una tarea
  function toggleTaskCompleted(id) {
    const updatedTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, terminada: !tarea.terminada };
      }
      return tarea;
    });
    setTareas(updatedTareas);
  }

  function deleteTarea(id) {
    const remainingTasks = tareas.filter((tarea) => id !== tarea.id);
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
        key={tarea.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTarea={deleteTarea}
        editTarea={editTarea}
      />
    ));               

  const filterList = FILTER_NAMES.map((titulo) => {
    return (
      <FilterButton
        key={titulo}
        titulo={titulo}
        isPressed={titulo === filter}
        setFilter={setFilter}
      />
    );
  });

  const tasksNoun = taskList.length !== 1 ? "tareas" : "tarea";
  const headingText = `${taskList.length} ${tasksNoun}`;

  return (
    <>
      <div className="todoapp stack-large">
        <h1>Administrar Tareas</h1>
          <Form addTarea={addTarea} />
          <div className="filters btn-group stack-exception">{filterList}</div>
          <h2 id="list-heading">{headingText}</h2>
          <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
            {/* muestro constante que contiene mi mapeo con mis tareas */}         
            {taskList}
          </ul>
      </div>
    </>
  );
}

export default App;
