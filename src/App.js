import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainCanvas from './components/MainCanvas';

function App() {
  return (
    <>
      <MainCanvas />
      <GlobalStyle />
    </>
  );
}

export default App;
