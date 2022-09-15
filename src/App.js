import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnnotationPage from './components/AnnotationPage';

function App() {
  return (
    <>
      <AnnotationPage />
      <GlobalStyle />
    </>
  );
}

export default App;
