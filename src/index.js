import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { nanoid } from "nanoid";

const root = ReactDOM.createRoot(document.getElementById('root'));
const DATA = [
  { id: `todo-${nanoid()}`, name: "Comer", completed: true },
  { id: `todo-${nanoid()}`, name: "Dormir", completed: false },
  { id: `todo-${nanoid()}`, name: "Repetir", completed: false }
];
root.render(
  <React.StrictMode>
    <App tasks={DATA}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
