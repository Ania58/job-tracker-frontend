import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleGetStarted = () => {
    if (user) {
        navigate("/my-jobs"); 
    } else {
        navigate("/register"); 
    }
};
    return (
        <main className="main-container">
      <section className="hero">
        <h1>Your Personal Job Application Tracker</h1>
        <h2>Stay organized and track your job applications in one place</h2>
        <p>
          Effortlessly manage your job search journey. Keep track of the
          positions you’ve applied for, interview updates, and application
          statuses—all in one place.
        </p>
        <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
      </section>

      <section className="hero-image">
        <img src="/job-offers.png" alt="Job Tracking Dashboard" />
      </section>

      <section className="features">
        <h2>Why Choose Job Tracker?</h2>
        <ul>
          <li>✅ Track all your job applications in one place</li>
          <li>✅ Set reminders for follow-ups</li>
          <li>✅ Monitor your progress from application to offer</li>
          <li>✅ Stay motivated and organized during your job hunt</li>
        </ul>
      </section>
    </main>
    )
};

export default MainPage;