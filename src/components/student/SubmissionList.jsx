import React from "react";
import SubmissionListItem from "./SubmissionListItem";

const SubmissionList = ({ submissions }) => {
	return (
		<ol>
			{submissions.map(submission => (
				<SubmissionListItem key={submission.id} submission={submission} />
			))}
		</ol>
	);
};

export default SubmissionList;
