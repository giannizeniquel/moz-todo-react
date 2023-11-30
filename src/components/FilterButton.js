import React from "react";


export default function FilterButton(props) {
  return (
      <a
        aria-pressed={props.isPressed}
        aria-label={props.titulo}
        value={props.titulo}
        onClick={() => props.setFilter(props.titulo)}
      >
        {props.titulo}
      </a>
  );
}
