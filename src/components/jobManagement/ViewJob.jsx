import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import JobForm from "./JobForm";

const ViewJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const response = await API.get(`/jobs/${id}`, { withCredentials: true });
            setJob(response.data.job);
        } catch (error) {
            console.error("Error retrieving job", error.response?.data || error);
            setError("Job not found or unauthorized.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            await API.delete(`/jobs/${id}`, { withCredentials: true });
            alert("Job deleted successfully!");
            navigate("/"); 
        } catch (error) {
            console.error("Error deleting job", error.response?.data || error);
            alert("Failed to delete job.");
        }
    };

    return (
        <div>
            <h2>Job Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                job && (
                    <>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Position:</strong> {job.position}</p>
                        <p><strong>Status:</strong> {job.status}</p>
                        <p><strong>Applied Date:</strong> {job.applied_date}</p>
                        <p><strong>Notes:</strong> {job.notes}</p>
                        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={() => navigate("/")}>Back</button>

                        {isEditing && (
                            <JobForm 
                                jobToEdit={job} 
                                onFormSubmit={() => {
                                    setIsEditing(false);
                                    fetchJob();
                                }} 
                            />
                        )}
                    </>
                )
            )}
        </div>
    );
};

export default ViewJob;
