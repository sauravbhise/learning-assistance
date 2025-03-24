import React from "react";

const StudentListItem = ({ student, onAction, actionLabel }) => {
	return (
		<div key={student.id}>
			<p>{student.email}</p>
			<button onClick={() => onAction(student.id)}>{actionLabel}</button>
		</div>
	);
};

export default StudentListItem;

