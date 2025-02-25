import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import JobForm from "./JobForm"; 

const UserJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedJob, setSelectedJob] = useState(null); 
    const [viewingJob, setViewingJob] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await API.get("/jobs", { withCredentials: true });
            setJobs(response.data.job);
            setError("");
        } catch (error) {
            console.error("Error fetching jobs", error.response?.data || error);
            setError("Failed to fetch jobs.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            await API.delete(`/jobs/${id}`, { withCredentials: true });
            setJobs(jobs.filter(job => job.id !== id));
            alert("Job deleted successfully!");
        } catch (error) {
            console.error("Error deleting job", error.response?.data || error);
            alert("Failed to delete job.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-blue-600 mb-4 text-center">Your Job Applications</h2>
                {loading ? (
                    <p className="text-center text-gray-600">Loading jobs...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : jobs.length === 0 ? (
                    <p className="text-center text-gray-600">No jobs found.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {jobs.map((job) => (
                            <li key={job.id} className="py-4 flex justify-between items-center">
                                 <div>
                                    <strong onClick={() => setViewingJob(job)}
                                       className="cursor-pointer text-blue-500 hover:underline">
                                        {job.position}
                                    </strong> at {job.company} 
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => setSelectedJob(job)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 cursor-pointer">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(job.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 cursor-pointer">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {viewingJob && (
                    <div className="mt-6 p-4 bg-gray-200 rounded-md shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-700">Job Details</h3>
                        <p><strong>Company:</strong> {viewingJob.company}</p>
                        <p><strong>Position:</strong> {viewingJob.position}</p>
                        <p><strong>Status:</strong> {viewingJob.status}</p>
                        <p><strong>Applied Date:</strong> {viewingJob.applied_date}</p>
                        <p><strong>Notes:</strong> {viewingJob.notes || "No additional notes."}</p>
                        <button onClick={() => setViewingJob(null)} className="mt-4 bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600 cursor-pointer">
                            Close
                        </button>
                    </div>
                )}
                
                {selectedJob && (
                    <div className="mt-6 p-4 bg-gray-200 rounded-md shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-700">Edit Job</h3>
                        <JobForm jobToEdit={selectedJob} onFormSubmit={() => { 
                            setSelectedJob(null); 
                            fetchJobs(); 
                        }} />
                        <button onClick={() => setSelectedJob(null)} className="mt-4 bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600 cursor-pointer">
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserJobs;
