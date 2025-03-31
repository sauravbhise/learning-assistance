import React from "react";
import useDownloadFile from "../../utils/downloadFile";

const AssignmentListItem = ({ assignment, onRemoveAssignment }) => {
	const downloadFile = useDownloadFile();

	return (
		<li>
			<strong>{assignment.title}</strong> - {assignment.description}
			<button onClick={() => downloadFile(assignment.filePath)}>View File</button>
			<button onClick={() => onRemoveAssignment(assignment.id)} style={{ marginLeft: "10px", color: "red" }}>
				Delete Assignment
			</button>
		</li>
	);
};

export default AssignmentListItem;


