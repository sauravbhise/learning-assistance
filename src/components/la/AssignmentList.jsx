import React from "react";
import AssignmentListItem from "./AssignmentListItem";

const AssignmentList = ({ assignments, onRemoveAssignment }) => {
	if (assignments.length === 0) {
		return <p>No assignments found.</p>;
	}

	return (
		<ul>
			{assignments.map((assignment) => (
				<AssignmentListItem
					key={assignment.id}
					assignment={assignment}
					onRemoveAssignment={onRemoveAssignment}
				/>
			))}
		</ul>
	);
};

export default AssignmentList;
