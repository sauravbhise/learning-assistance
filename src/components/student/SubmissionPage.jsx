import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const SubmissionPage = () => {
	const { auth } = useAuth();
	const { submissionId } = useParams();

	const [submission, setSubmission] = useState(null);
	const [evaluation, setEvaluation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSubmission = async () => {
			try {
				const response = await axios.get(`/submissions/${submissionId}`, {
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					},
				});
				setSubmission(response.data);

				// If submission is evaluated, fetch evaluation details
				if (response.data.evaluated) {
					const evalResponse = await axios.get(`/evaluations/submission/${submissionId}`, {
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
			<a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
				<button>View File</button>
			</a>

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
		</div>
	);
};

export default SubmissionPage;
