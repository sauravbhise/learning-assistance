import React from "react";
import { NavLink } from "react-router-dom";

const LaSubmissionListItem = ({ submission }) => {
	return (
		<li>
			Assignment ID: {submission.assignmentId} - Student: {submission.createdBy}
			<a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
				<button>View File</button>
			</a>
			<NavLink to={`/la/evaluate/${submission.id}`}>
				<button>Evaluate</button>
			</NavLink>
		</li>
	);
};

export default LaSubmissionListItem;
