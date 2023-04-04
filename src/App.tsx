import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Breadcrumbs/>
      <AppRouter/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
