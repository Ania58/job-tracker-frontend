import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/context/UserProvider";
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import MainPage from './components/layout/MainPage';
import Login from "./components/auth/Login";  
import Register from "./components/auth/Register";
import JobForm from './components/jobManagement/JobForm';
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
