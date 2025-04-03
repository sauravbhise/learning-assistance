import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import LaSubmissionList from "../la/LaSubmissionList";
import EvaluationList from "../la/EvaluationList";

const EvaluationsPage = () => {
	const { auth } = useAuth();
	const { laId } = useParams();
	const [submissions, setSubmissions] = useState([]);
	const [pendingEvaluations, setPendingEvaluations] = useState([]);
	const [completedEvaluations, setCompletedEvaluations] = useState([]);

	const navigate = useNavigate()

	useEffect(() => {
		const fetchEvaluationsAndSubmissions = async () => {
			try {
				const submissionResponse = await axios.get(`/la/${laId}/submissions`, {
					headers: { Authorization: "Bearer " + auth.accessToken }
				});
				const allSubmissions = submissionResponse.status === 204 ? [] : submissionResponse.data;

				const evaluationResponse = await axios.get(`/users/${laId}/evaluations`, {
					headers: { Authorization: "Bearer " + auth.accessToken }
				});
				const allEvaluations = evaluationResponse.status === 204 ? [] : evaluationResponse.data;

				const evaluatedSubmissionIds = new Set(allEvaluations.map(e => e.submissionId));

				const pending = allSubmissions.filter(s => !evaluatedSubmissionIds.has(s.id));
				const completed = allEvaluations;

				setSubmissions(pending);
				setPendingEvaluations(pending);
				setCompletedEvaluations(completed);
			} catch (error) {
				console.error("Error fetching evaluations or submissions:", error);
				setPendingEvaluations([]);
				setCompletedEvaluations([]);
			}
		};

		fetchEvaluationsAndSubmissions();
	}, [laId, auth.accessToken]);

	return (
		<div>
			<h1>Evaluation Management</h1>

			<h2>Submissions Pending Evaluation</h2>
			{pendingEvaluations.length > 0 ? (
				<LaSubmissionList submissions={pendingEvaluations} />
			) : (
				<p>No pending submissions.</p>
			)}

			<h2>Completed Evaluations</h2>
			{completedEvaluations.length > 0 ? (
				<EvaluationList evaluations={completedEvaluations} />
			) : (
				<p>No completed evaluations.</p>
			)}

			<button onClick={() => navigate(-1)}>Go Back</button>
		</div>
	);
};

export default EvaluationsPage;
