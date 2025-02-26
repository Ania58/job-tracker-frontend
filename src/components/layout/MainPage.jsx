import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleGetStarted = () => {
    navigate(user ? "/my-jobs" : "/register");
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900">
      <section className="text-center max-w-3xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-blue-600">
          Your Personal Job Application Tracker
        </h1>
        <h2 className="text-lg md:text-xl text-gray-700">
          Stay organized and track your job applications in one place
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Effortlessly manage your job search journey. Keep track of the
          positions you’ve applied for, interview updates, and application
          statuses—all in one place.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all cursor-pointer"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </section>
      <section className="max-w-lg">
        <img
          src="/job-offers.png"
          alt="Job Tracking Dashboard"
          className="rounded-lg shadow-lg"
        />
      </section>
      <section className="max-w-3xl px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose JobSync?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-xl">✅</span>
            <p>Track all your job applications in one place</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-xl">✅</span>
            <p>Set reminders for follow-ups</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-xl">✅</span>
            <p>Monitor your progress from application to offer</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-xl">✅</span>
            <p>Stay motivated and organized during your job hunt</p>
          </div>
        </div>
      </section>
      <section className="max-w-3xl px-6 py-12 text-center bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What Our Users Say
        </h2>
        <blockquote className="italic text-gray-600">
          "JobSync helped me track my applications and land my dream job at
          Google!"
        </blockquote>
        <p className="mt-2 font-semibold text-gray-700">— Alex Johnson</p>
      </section>
      <section className="max-w-3xl px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Pro Tips for Your Job Hunt
        </h2>
        <ul className="text-gray-600 space-y-2">
          <li>📅 Follow up on applications within a week.</li>
          <li>📄 Tailor your resume for each job application.</li>
          <li>💬 Network with professionals in your industry.</li>
          <li>🔍 Use keywords in your resume to pass ATS screenings.</li>
        </ul>
      </section>
      <section className="py-6">
        <button
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all cursor-pointer"
          onClick={handleGetStarted}
        >
          Get Started Now
        </button>
      </section>
    </main>
  );
};

export default MainPage;
