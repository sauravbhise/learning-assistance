import React, { useEffect } from 'react'
import AssignmentList from './AssignmentList'
import SubmissionList from './SubmissionList'
import useAuth from '../../hooks/useAuth'
import { getStudentAssignments, getStudentSubmissions } from '../../api/mock-axios'

const StudentDashboard = () => {

	const { auth } = useAuth()
	const { id } = auth

	const assignments = getStudentAssignments(id)
	const submissions = getStudentSubmissions(id)

	return (
		<div>
			<h1>Student Dashboard</h1>

			<AssignmentList assignments={assignments} />

			<SubmissionList submissions={submissions} />

		</div>
	)
}

export default StudentDashboard