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
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      <section className="text-center max-w-3xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-blue-600">Your Personal Job Application Tracker</h1>
        <h2 className="text-lg md:text-xl text-gray-700">Stay organized and track your job applications in one place</h2>
        <p className="mt-4 text-gray-600 text-lg">
          Effortlessly manage your job search journey. Keep track of the
          positions you’ve applied for, interview updates, and application
          statuses—all in one place.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all cursor-pointer" 
        onClick={handleGetStarted}>Get Started</button>
      </section>

      <section className="max-w-lg">
        <img src="/job-offers.png" alt="Job Tracking Dashboard" className="rounded-lg shadow-lg" />
      </section>

      <section className="max-w-3xl px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Job Tracker?</h2>
        <ul className="text-gray-600 space-y-2">
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