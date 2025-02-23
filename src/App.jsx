import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <UserProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<AuthSection />} />
            <Route path="/register" element={<AuthSection />} />
            <Route path="/add-job" element={<JobForm />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider>
    </>
  )
}

export default App
