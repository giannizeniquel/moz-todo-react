import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid"; //libreria externa para generar ids



function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name){
    const newTask = {id: `todo-${nanoid()}`, name: name, completed: false};
    setTasks([...tasks, newTask]); // asi copio la matriz original y agrego mi nuevo elemento a lo ultimo
  }

  // Actualizo check de una tarea
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  //recorro matriz de tareas que fue declarada en Index.js y recibo en props como tasks, renderizo Componente Todo
  const taskList = tasks.map((task) => ( 
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
      
  ));

  const tasksNoun = taskList.length !== 1 ? 'tareas' : 'tarea';
  const headingText = `${taskList.length} ${tasksNoun}`;

  return (
    <div className="todoapp stack-large">
      <h1>Administrar Tareas</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton name="Todos" pressed="true" />
        <FilterButton name="Activas" />
        <FilterButton name="Completadas"/> 
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading" >
        {/* muestro constante que contiene mi mapeo con mis tareas */}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
