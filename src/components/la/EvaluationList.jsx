import React from "react";
import EvaluationListItem from "./EvaluationListItem";

const EvaluationList = ({ evaluations }) => {
	if (!evaluations || evaluations.length === 0) {
		return <p>No Evaluations Performed</p>;
	}

	return (
		<div>
			{evaluations.map((evaluation) => (
				<EvaluationListItem key={evaluation.id} evaluation={evaluation} />
			))}
		</div>
	);
};

export default EvaluationList;
