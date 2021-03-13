import React from 'react';
import './Task.css';

export default function Task(props) {
  return (
    <li key={props.id}>
      {props.task}
      <span onClick={props.delete}>&times;</span>
    </li>
  );
}
