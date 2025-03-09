import React from 'react'
import { NavLink } from 'react-router-dom'

const AssignmentListItem = ({ assignments }) => {

	return (
		<div>
			{assignments.map(assignment => {
				return (
					<div key={assignment.title}>
						<li>{assignment.title}</li>
						<NavLink to={`/student/assignments/${assignment.id}/upload`}>
							<button>Upload</button>
						</NavLink>
					</div>
				)
			})}
		</div>
	)
}

export default AssignmentListItem