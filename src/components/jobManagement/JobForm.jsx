import React, { useState } from "react";
import API from "../../api/axios";

const JobForm = () => {
    const [job, setJob] = useState({
        company:"", 
        position:"", 
        status:"Applied", 
        applied_date:"", 
        notes:""
    });
    const[error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setJob({...job, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await API.post("/jobs", job, { withCredentials: true });
            console.log("Job added successfully", response.data);
            setSuccess("Job added successfully!");
            setJob({ company: "", position: "", status: "Applied", applied_date: "", notes: "" });
        } catch (error) {
            console.error("Error adding job", error.response?.data || error);
            setError("Server error. Please try again.");
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input name="company" placeholder="Company" value={job.company} onChange={handleChange} required />
            <input name="position" placeholder="Position" value={job.position} onChange={handleChange} required />
            <select name="status" placeholder="Status" value={job.status} onChange={handleChange} required>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Ghosted">Ghosted</option>
            </select>
            <input name="applied_date" type="date" placeholder="Applied Date" value={job.applied_date} onChange={handleChange} required />
            <textarea name="notes" placeholder="Notes" value={job.notes} onChange={handleChange} />
            <button type="submit">Create a Job</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
        </>
    )
};

export default JobForm;