import React from 'react';
import AppRouter from './components/AppRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

export default function App() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <AppRouter />
      <Footer />
    </>
  );
}
