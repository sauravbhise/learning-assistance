import React from "react";
import StudentListItem from "./StudentListItem";

const StudentList = ({ students, onAction, actionLabel }) => {
	return (
		<div>
			{students.length > 0 ? (
				students.map((student) => (
					<StudentListItem
						key={student.id}
						student={student}
						onAction={onAction}
						actionLabel={actionLabel}
					/>
				))
			) : (
				<p>No students available.</p>
			)}
		</div>
	);
};

export default StudentList;

