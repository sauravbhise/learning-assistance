import React from "react";
import { NavLink } from "react-router-dom";
import useDownloadFile from "../../utils/downloadFile";

const LaSubmissionListItem = ({ submission }) => {
	const downloadFile = useDownloadFile()

	return (
		<li>
			Assignment ID: {submission.assignmentId} - Student: {submission.createdBy}
			<button onClick={() => downloadFile(submission.filePath)}>View File</button>
			<NavLink to={`/la/evaluate/${submission.id}`}>
				<button>Evaluate</button>
			</NavLink>
		</li>
	);
};

export default LaSubmissionListItem;
