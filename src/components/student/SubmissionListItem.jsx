import React from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const SubmissionListItem = ({ submissions }) => {
	const { auth } = useAuth()
	const { id } = auth

	return (
		<div>
			{submissions.map(
				submission => {
					if (submission.student_id === id) {
						return (
							<div key={submission.id}>
								<li>{submission.assignment_id}</li>
								<NavLink to={`/student/submissions/${submission.id}`}>
									<button>View</button>
								</NavLink>
							</div>
						)
					}
				}
			)}
		</div>
	)
}

export default SubmissionListItem