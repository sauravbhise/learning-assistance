import React from 'react'
import SubmissionListItem from './SubmissionListItem'

const SubmissionList = ({ submissions }) => {
	return (
		<div>
			<h3>Your Submissions</h3>
			<ol>
				<SubmissionListItem submissions={submissions} />
			</ol>
		</div>
	)
}

export default SubmissionList