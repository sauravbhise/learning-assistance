import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { addAssignment } from "../../api/mock-axios";

const AddAssignmentPage = () => {
	const { auth } = useAuth();
	const { id: laId } = auth; // LA ID
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState("");

	const handleFileChange = (e) => {
		const uploadedFile = e.target.files[0];
		setFile(uploadedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !description || !file) {
			setMessage("Please fill all fields.");
			return;
		}

		// Simulate file upload and get a URL (Replace this with actual API call)
		const fileUrl = URL.createObjectURL(file);

		const newAssignment = await addAssignment(laId, title, description, fileUrl);

		if (newAssignment) {
			setMessage("Assignment added successfully!");
			setTitle("");
			setDescription("");
			setFile(null);
		} else {
			setMessage("Failed to add assignment. Try again.");
		}
	};

	return (
		<div>
			<h1>Add Assignment</h1>

			{message && <p>{message}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>Title:</label>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
				</div>

				<div>
					<label>Description:</label>
					<textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
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
