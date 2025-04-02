import React from "react";
import UserList from "./UserList";

const StudentList = ({ students, onRemoveUser }) => {
	return (
		<div>
			<h3>Students</h3>
			{students.length ? <UserList users={students} onRemoveUser={onRemoveUser} isRemovable={true} /> : <p>No Students Found!</p>}
		</div>
	);
};

export default StudentList;