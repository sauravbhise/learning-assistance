import React from 'react'
import AssignmentListItem from './AssignmentListItem'

const AssignmentList = ({ assignments }) => {
	return (
		<div>
			<h3>Your Assignments</h3>
			<ol>
				<AssignmentListItem assignments={assignments} />
			</ol>
		</div>
	)
}

export default AssignmentList