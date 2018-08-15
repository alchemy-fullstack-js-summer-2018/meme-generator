import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';

const name = 'Markalope';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);