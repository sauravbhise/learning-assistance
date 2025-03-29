import React from "react";
import LaSubmissionListItem from "./LaSubmissionListItem";

const LaSubmissionList = ({ submissions }) => {
	return (
		<div>
			{submissions.length > 0 ? (
				<ul>
					{submissions
						.filter(submission => !submission.evaluated)
						.map(submission => (
							<LaSubmissionListItem key={submission.id} submission={submission} />
						))
					}
				</ul>
			) : (
				<p>No submissions pending evaluation.</p>
			)}
		</div>
	);
};

export default LaSubmissionList;
