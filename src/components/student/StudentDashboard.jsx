import React from 'react'
import AssignmentList from './AssignmentList'
import SubmissionList from './SubmissionList'
import mockDB from '../../mock/mockDB'

const StudentDashboard = () => {
	const assignments = mockDB.assignments
	const submissions = mockDB.submissions

	return (
		<div>
			<h1>Student Dashboard</h1>

			<AssignmentList assignments={assignments} />

			<SubmissionList submissions={submissions} />

		</div>
	)
}

export default StudentDashboard