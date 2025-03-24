import React from "react";

const AssignmentListItem = ({ assignment }) => {
	return (
		<li>
			<strong>{assignment.title}</strong> - {assignment.description}
			<a href={assignment.file_url} target="_blank" rel="noopener noreferrer">
				<button>View File</button>
			</a>
		</li>
	);
};

export default AssignmentListItem;
