import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import API from "../../api/axios";
import JobForm from "./JobForm";

const ViewJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const isEditing = searchParams.get("edit") === "true";

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
            navigate("/my-jobs"); 
        } catch (error) {
            console.error("Error deleting job", error.response?.data || error);
            alert("Failed to delete job.");
        }
    };

    const toggleEditMode = () => {
        const newParams = new URLSearchParams(searchParams);
        if (isEditing) {
            newParams.delete("edit");
        } else {
            newParams.set("edit", "true");
        }
        setSearchParams(newParams);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-3xl bg-white p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Job Details</h2>

                {loading ? (
                    <p className="text-gray-500 text-center">Loading...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    job && (
                        <div className="space-y-4">
                            {!isEditing ? (
                                <>
                                    <p className="text-lg"><strong className="text-gray-700">Company:</strong> {job.company}</p>
                                    <p className="text-lg"><strong className="text-gray-700">Position:</strong> {job.position}</p>
                                    <p className="text-lg"><strong className="text-gray-700">Status:</strong> {job.status}</p>
                                    <p className="text-lg"><strong className="text-gray-700">Applied Date:</strong> {job.applied_date}</p>
                                    <p className="text-lg"><strong className="text-gray-700">Notes:</strong> {job.notes || "No additional notes."}</p>
                                    <div className="flex space-x-4 mt-6">
                                        <button onClick={toggleEditMode} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 cursor-pointer">
                                            {isEditing ? "Cancel" : "Edit"}
                                        </button>
                                        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer">
                                            Delete
                                        </button>
                                        <button onClick={() => navigate("/my-jobs")} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer">
                                            Back
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
                                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Job</h3>
                                    <JobForm 
                                        jobToEdit={job} 
                                        onFormSubmit={() => {
                                            toggleEditMode(); 
                                            fetchJob(); 
                                        }} 
                                    />
                                    <button onClick={toggleEditMode} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer">
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ViewJob;
