import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { addSubmission } from "../../api/mock-axios";

const FileUpload = () => {

	const [file, setFile] = useState(null)
	const { auth } = useAuth()
	const { assignmentId } = useParams()

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0]
		if (selectedFile) {
			setFile(selectedFile)
		}
	}

	const handleUpload = () => {
		if (!file) {
			alert("Please select a file first!")
		}

		const studentId = auth.id
		addSubmission(assignmentId, studentId, file.name)
	}

	return (
		<div>
			<h1>Upload Assignment</h1>
			<input type="file" onChange={handleFileChange} />
			{file && <p> Selected File: {file.name} </p>}

			<button onClick={handleUpload}> Upload Submission</button>

		</div>
	)
}

export default FileUpload 