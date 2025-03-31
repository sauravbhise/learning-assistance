import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import useDownloadFile from "../../utils/downloadFile";

const EvaluationPage = () => {
	const { auth } = useAuth();
	const { id: laId } = auth
	const { submissionId } = useParams();
	const navigate = useNavigate();

	const [submission, setSubmission] = useState(null);
	const [score, setScore] = useState("");
	const [feedback, setFeedback] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const downloadFile = useDownloadFile();

	useEffect(() => {
		const fetchSubmission = async () => {
			try {
				const response = await axios.get(`/submissions/${submissionId}`, {
					headers: { Authorization: "Bearer " + auth.accessToken },
				});
				setSubmission(response.data);
				setLoading(false);
			} catch (err) {
				console.error("Error fetching submission:", err);
				setError("Failed to load submission.");
				setLoading(false);
			}
		};

		fetchSubmission();
	}, [submissionId, auth.accessToken]);

	const handleSubmitEvaluation = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				`/evaluations`,
				{
					submissionId,
					evaluatorId: laId,
					score: parseFloat(score),
					feedback,
				},
				{
					headers: { Authorization: "Bearer " + auth.accessToken },
				}
			);

			alert("Evaluation submitted successfully!");
			navigate("/la");
		} catch (err) {
			console.error("Error submitting evaluation:", err);
			setError("Failed to submit evaluation.");
		}
	};

	if (loading) return <p>Loading submission...</p>;
	if (error) return <p>{error}</p>;
	if (!submission) return <p>Submission not found.</p>;

	return (
		<div>
			<h1>Evaluate Submission</h1>
			<p><strong>Submission ID:</strong> {submission.id}</p>
			<p><strong>Assignment ID:</strong> {submission.assignmentId}</p>
			<button onClick={() => downloadFile(submission.filePath)}>View Submitted File</button>

			<h3>Provide Evaluation</h3>
			<form onSubmit={handleSubmitEvaluation}>
				<div>
					<label>Score (0-100):</label>
					<input
						type="number"
						value={score}
						onChange={(e) => setScore(e.target.value)}
						min="0"
						max="100"
						required
					/>
				</div>
				<div>
					<label>Feedback:</label>
					<textarea
						value={feedback}
						onChange={(e) => setFeedback(e.target.value)}
						required
					></textarea>
				</div>
				<button type="submit">Submit Evaluation</button>
			</form>

			<button onClick={() => navigate(-1)}>Go Back</button>
		</div>
	);
};

export default EvaluationPage;

