import React from "react";

const EvaluationListItem = ({ evaluation }) => {
	return (
		<div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
			<p><strong>Submission ID:</strong> {evaluation.submissionId}</p>
			<p><strong>Score:</strong> {evaluation.score}</p>
			<p><strong>Feedback:</strong> {evaluation.feedback}</p>
		</div>
	);
};

export default EvaluationListItem;
