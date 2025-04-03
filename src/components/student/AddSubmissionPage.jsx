import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import useDownloadFile from "../../utils/downloadFile";

const AddSubmissionPage = () => {
	const { auth } = useAuth();
	const { id } = auth;
	const navigate = useNavigate();
	const downloadFile = useDownloadFile()

	const [message, setMessage] = useState("")
	const [file, setFile] = useState(null);
	const [assignment, setAssignment] = useState(null);
	const { assignmentId } = useParams()

	useEffect(() => {
		const fetchAssignment = async (assignmentId) => {

			try {
				const assignmentResponse = await axios.get(`/assignments/${assignmentId}`, {
					headers: {
						Authorization: "Bearer " + auth.accessToken
					}
				})

				const assignment = assignmentResponse.data

				if (!assignment) {
					throw new Error("Assignment not found!")
				}

				setAssignment(assignment);

			} catch (error) {
				console.log("Error fetching assignment file: ", error)
			}

		}

		fetchAssignment(assignmentId)

	}, [assignmentId, auth.accessToken])

	const handleFileChange = (e) => {
		const uploadedFile = e.target.files[0];
		setFile(uploadedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			setMessage("Please select a file to submit.");
			return;
		}

		const formData = new FormData()
		formData.append("createdBy", id)
		formData.append("assignmentId", assignmentId)
		formData.append("file", file)

		try {
			const newSubmissionResponse = await axios.post("/submissions", formData, {
				headers: {
					Authorization: "Bearer " + auth.accessToken,
					"Content-Type": "multipart/form-data"
				}
			})

			if (newSubmissionResponse.status === 200) {
				setMessage("Assignment submitted!");
				setFile(null);
				navigate("/student")
			} else {
				setMessage("Failed to add submission. Try again.");
			}
		} catch (error) {
			if (error.response && error.response.status === 500) {
				setMessage("Only PDFs allowed.");
			} else {
				setMessage("Failed to add submission. Try again.");
			}
		}
	};

	return (
		<div>
			<h1>Submission</h1>

			{
				assignment ? (
					<div>
						<h3>Assignment Title: {assignment.title}</h3>
						<button
							onClick={() => downloadFile(assignment.filePath)}
						>Download File</button>
					</div>
				)
					: <p>Loading...</p>
			}

			{message && <p>{message}</p>}

			<form onSubmit={handleSubmit}>

				<div>
					<label>Upload File:</label>
					<input type="file" onChange={handleFileChange} required />
				</div>

				<button type="submit">Upload Submission</button>
			</form>

			<button onClick={() => navigate("/student")}>Go Back</button>
		</div>
	);
};

export default AddSubmissionPage;
