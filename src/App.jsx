import { useState, useEffect } from 'react';
import { UserProvider } from "./components/context/UserProvider";
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import MainPage from './components/layout/MainPage';
import AuthSection from "./components/auth/AuthSection";
import API from './api/axios';
import './App.css'

function App() {

  return (
    <>
      <Header />
      <main>
        <UserProvider>
          <AuthSection /> 
        </UserProvider>
        <MainPage /> 
      </main>
      <Footer />
    </>
  )
}

export default App
