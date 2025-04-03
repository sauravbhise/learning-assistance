import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const DESCRIPTION_LIMIT = 500;

const AddAssignmentPage = () => {
	const { auth } = useAuth();
	const { laId } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState("");

	const handleFileChange = (e) => {
		const uploadedFile = e.target.files[0];
		setFile(uploadedFile);
	};

	const handleDescriptionChange = (e) => {
		const text = e.target.value;
		if (text.length <= DESCRIPTION_LIMIT) {
			setDescription(text);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !description || !file) {
			setMessage("Please fill all fields.");
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("createdBy", laId);
		formData.append("file", file);

		try {
			const newAssignmentResponse = await axios.post("/assignments", formData, {
				headers: {
					Authorization: "Bearer " + auth.accessToken,
					"Content-Type": "multipart/form-data",
				},
			});

			if (newAssignmentResponse.status === 200) {
				setMessage("Assignment added successfully!");
				setTitle("");
				setDescription("");
				setFile(null);
			} else {
				setMessage("Failed to add assignment. Try again.");
			}
		} catch (error) {
			setMessage("Error: " + (error.response?.data?.message || "Only PDFs allowed"));
		}
	};

	return (
		<div>
			<h1>Add Assignment</h1>

			{message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>Title:</label>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
				</div>

				<div>
					<label>Description:</label>
					<textarea
						value={description}
						onChange={handleDescriptionChange}
						required
					/>
					<p style={{ fontSize: "12px", color: description.length === DESCRIPTION_LIMIT ? "red" : "black" }}>
						{DESCRIPTION_LIMIT - description.length} characters left
					</p>
				</div>

				<div>
					<label>Upload File:</label>
					<input type="file" onChange={handleFileChange} required />
				</div>

				<button type="submit">Add Assignment</button>
			</form>

			<button onClick={() => navigate(-1)}>Go Back</button>
		</div>
	);
};

export default AddAssignmentPage;
