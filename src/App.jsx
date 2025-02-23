import { useState, useEffect } from 'react';
import { UserProvider } from "./components/context/UserProvider";
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import MainPage from './components/layout/MainPage';
import AuthSection from "./components/auth/AuthSection";
import JobForm from './components/jobManagement/JobForm';
import API from './api/axios';
import './App.css'

function App() {
  const [jobToEdit, setJobToEdit] = useState(null);
  return (
    <>
      <Header />
      <main>
        <UserProvider>
          <AuthSection /> 
          <JobForm />
          {jobToEdit && <JobForm jobToEdit={jobToEdit} />}
        </UserProvider>
        <MainPage /> 
      </main>
      <Footer />
    </>
  )
}

export default App
