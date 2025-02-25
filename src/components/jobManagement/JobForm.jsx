import React, { useState,  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const JobForm = ({ jobToEdit, onFormSubmit }) => {
    const [job, setJob] = useState({
        company:"", 
        position:"", 
        status:"Applied", 
        applied_date:"", 
        notes:""
    });
    const[error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (jobToEdit) {
            setJob(jobToEdit);
        }
    }, [jobToEdit]);

    const handleChange = (e) => {
        setJob({...job, [e.target.name]: e.target.value})
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            let response;
            if (jobToEdit) {
                response = await API.patch(`/jobs/${jobToEdit.id}`, job, { withCredentials: true });
                setSuccess("Job updated successfully!");
                navigate("/my-jobs"); 
            } else {
                response = await API.post("/jobs", job, { withCredentials: true });
                console.log("Job added successfully", response.data);
                setSuccess("Job added successfully!");
                setJob({ company: "", position: "", status: "Applied", applied_date: "", notes: "" });
                navigate("/my-jobs"); 
            }
            console.log("Job action successful", response.data);
            if (onFormSubmit) onFormSubmit();
        } catch (error) {
            console.error("Error with job action", error.response?.data || error);
            setError("Server error. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">{jobToEdit ? "Update Job" : "Add a Job"}</h2>
                
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                {success && <p className="text-green-500 text-center mb-2">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        name="company" 
                        placeholder="Company" 
                        value={job.company} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        name="position" 
                        placeholder="Position" 
                        value={job.position} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select 
                        name="status" 
                        placeholder="Status" 
                        value={job.status} 
                        onChange={handleChange} 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Ghosted">Ghosted</option>
                    </select>
                    <input 
                        name="applied_date" 
                        type="date" 
                        placeholder="Applied Date" 
                        value={job.applied_date} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea 
                        name="notes" 
                        placeholder="Notes" 
                        value={job.notes} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                    >
                        {jobToEdit ? "Update Job" : "Create Job"}
                    </button>
                </form>
            </div>
        </div>
    )
};

export default JobForm;