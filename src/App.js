import React from 'react';
//import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { AnnotationContextProvider} from "./components/AnnotationContext";

import AnnotationPage from './components/AnnotationPage';
import CheckPage from './components/CheckPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<AnnotationPage />,
    },
    {
      path: "/Check",
      element:<CheckPage />,
    },
  ]);

  return (
    <>
    <AnnotationContextProvider>
      <Header />
      <RouterProvider router={router} />
      <GlobalStyle />
    </AnnotationContextProvider>
    </>
  );
}
const Header = () => {
  return (
  <Navbar bg="dark" variant="dark" className='px-4'>
      <Navbar.Brand href="#">OCR-Annotation</Navbar.Brand>
      <Nav className="me-auto">
          <Button className="mx-1 btn-dark">Annotation</Button>
          <Button className="mx-1 btn-dark">Result</Button>
      </Nav>
  </Navbar>
  );
}

export default App;
