import React from "react";
import { NavLink } from "react-router-dom";

const AssignmentListItem = ({ assignment, actionLabel }) => {
	const actionPath =
		actionLabel === "Upload"
			? `/student/assignments/${assignment.id}/upload`
			: `/student/assignments/${assignment.id}/submission`;

	return (
		<li key={assignment.id}>
			{assignment.title}
			<NavLink to={actionPath}>
				<button>{actionLabel}</button>
			</NavLink>
		</li>
	);
};

export default AssignmentListItem;
