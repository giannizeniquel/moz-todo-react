import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { fetchData } from "./fetchData";
import { Suspense } from "react"; // componente nativo, me ayuda a esperar mis peticiones y mostrar el spinner
import { Hypnosis } from "react-cssfx-loading"; // componente nativo para mostrar spinner

const url = "http://127.0.0.1:8000/api/tareas/1";
const apiData = fetchData(url);

const FILTER_MAP = {
  Todas: () => true,
  Activas: (tarea) => !tarea.terminada,
  Completadas: (tarea) => tarea.terminada,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const data = apiData.read();
  const [tareas, setTareas] = useState(data);
  const [filter, setFilter] = useState("Todas");
  function addTarea(titulo) {
    const newTarea = {titulo: titulo, terminada: false };
    setTareas([...tareas, newTarea]); // asi copio la matriz original y agrego mi nuevo elemento a lo ultimo
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
    <div className="todoapp stack-large">
      <h1>Administrar Tareas</h1>
        <Form addTarea={addTarea} />
        <div className="filters btn-group stack-exception">{filterList}</div>
        <h2 id="list-heading">{headingText}</h2>
        <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        <Suspense fallback={<div className="container-loading"><Hypnosis width="50px" height="50px" duration="4s" /></div>}>
          {/* muestro constante que contiene mi mapeo con mis tareas */}         
          {taskList}
        </Suspense>
        </ul>
    </div>
  );
}

export default App;
