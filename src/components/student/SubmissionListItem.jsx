import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SubmissionListItem = ({ submission }) => {
	const { auth } = useAuth();
	const { id } = auth;

	if (submission.createdBy != id) return null;

	return (
		<li>
			<strong>Assignment ID:</strong> {submission.assignmentId}
			<NavLink to={`/student/submissions/${submission.id}`}>
				<button>View</button>
			</NavLink>
		</li>
	);
};

export default SubmissionListItem;
