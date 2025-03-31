import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useDownloadFile from "../../utils/downloadFile";

const SubmissionPage = () => {
	const { auth } = useAuth();
	const { id } = auth;
	const { assignmentId } = useParams();
	const navigate = useNavigate();
	const downloadFile = useDownloadFile();
	let submissionId = null;

	const [submission, setSubmission] = useState(null);
	const [evaluation, setEvaluation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSubmission = async () => {
			try {
				const response = await axios.get(`/students/${id}/assignments/${assignmentId}/submission`, {
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					},
				});
				setSubmission(response.data);
				submissionId = response.data.id;

				if (response.data.evaluated) {
					const evalResponse = await axios.get(`/submissions/${submissionId}/evaluation`, {
						headers: {
							Authorization: `Bearer ${auth.accessToken}`,
						},
					});
					setEvaluation(evalResponse.data);
				}
			} catch (err) {
				console.error("Error fetching submission:", err);
				setError("Failed to load submission. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchSubmission();
	}, [submissionId, auth.accessToken]);

	if (loading) return <p>Loading submission...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;
	if (!submission) return <p>No submission found.</p>;

	return (
		<div>
			<h1>Submission</h1>
			<p>ID: {submission.id}</p>
			<button onClick={() => downloadFile(submission.filePath)}>Download File</button>

			<h3>Evaluation</h3>
			{submission.evaluated ? (
				evaluation ? (
					<div>
						<p><strong>Score:</strong> {evaluation.score}</p>
						<p><strong>Feedback:</strong> {evaluation.feedback}</p>
					</div>
				) : (
					<p>Loading evaluation...</p>
				)
			) : (
				<p>Evaluation Pending!</p>
			)}

			<button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
				Go Back
			</button>
		</div>
	);
};

export default SubmissionPage;
