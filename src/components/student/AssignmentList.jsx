import React from "react";
import AssignmentListItem from "./AssignmentListItem";

const AssignmentList = ({ assignments, actionLabel }) => {
	return (
		<ul>
			{assignments.map((assignment) => (
				<AssignmentListItem key={assignment.id} assignment={assignment} actionLabel={actionLabel} />
			))}
		</ul>
	);
};

export default AssignmentList;
