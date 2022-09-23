import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AnnotationContextProvider} from "./components/annotationContext";

import AnnotationPage from './components/AnnotationPage';

function App() {
  return (
    <>
    <AnnotationContextProvider>
      <AnnotationPage />
      <GlobalStyle />
      </AnnotationContextProvider>
    </>
  );
}

export default App;
