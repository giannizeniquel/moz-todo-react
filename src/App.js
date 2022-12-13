import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  //recorro matriz de tareas que fue declarada en Index.js y recibo en props como tasks
  const taskList = props.tasks.map((task) => ( 
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id}/>
  ));

  return (
    <div className="todoapp stack-large">
      <h1>Administrar Tareas</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        <FilterButton name="Todos" pressed="true" />
        <FilterButton name="Activas" />
        <FilterButton name="Completadas"/> 
      </div>
      <h2 id="list-heading">
        Quedan {taskList.length} tareas
      </h2>
      <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading" >
        {/* muestro constante que contiene mi mapeo con mis Todos */}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
