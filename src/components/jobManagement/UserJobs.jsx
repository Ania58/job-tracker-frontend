import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import JobForm from "./JobForm"; 

const UserJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedJob, setSelectedJob] = useState(null); 

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
                            <strong>{job.position}</strong> at {job.company} 
                            <button onClick={() => setSelectedJob(job)}>Edit</button>
                            <button onClick={() => handleDelete(job.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
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
