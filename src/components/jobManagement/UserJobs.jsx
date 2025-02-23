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
        <div>
            <h2>Your Job Applications</h2>
            {loading ? (
                <p>Loading jobs...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : jobs.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <ul>
                    {jobs.map((job) => (
                        <li key={job.id}>
                            <strong onClick={() => setViewingJob(job)}
                                style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>
                                {job.position}</strong> at {job.company} 
                            <button onClick={() => setSelectedJob(job)}>Edit</button>
                            <button onClick={() => handleDelete(job.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            {viewingJob && (
                <div>
                    <h3>Job Details</h3>
                    <p><strong>Company:</strong> {viewingJob.company}</p>
                    <p><strong>Position:</strong> {viewingJob.position}</p>
                    <p><strong>Status:</strong> {viewingJob.status}</p>
                    <p><strong>Applied Date:</strong> {viewingJob.applied_date}</p>
                    <p><strong>Notes:</strong> {viewingJob.notes || "No additional notes."}</p>
                    <button onClick={() => setViewingJob(null)}>Close</button>
                </div>
            )}
            
            {selectedJob && (
                <div>
                    <h3>Edit Job</h3>
                    <JobForm jobToEdit={selectedJob} onFormSubmit={() => { 
                        setSelectedJob(null); 
                        fetchJobs(); 
                    }} />
                    <button onClick={() => setSelectedJob(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default UserJobs;
