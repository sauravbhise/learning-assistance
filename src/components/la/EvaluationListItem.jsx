import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const EvaluationListItem = ({ evaluation }) => {

	const { auth } = useAuth()
	const [submission, setSubmission] = useState(null)
	const [student, setStudent] = useState(null)
	const [assignment, setAssignment] = useState(null)

	useEffect(() => {
		const fetchSubmissionDetails = async (submissionId) => {
			try {
				const submissionResponse = await axios.get(`/submissions/${submissionId}`, {
					headers: {
						Authorization: "Bearer " + auth.accessToken
					}
				})
				setSubmission(submissionResponse.data)
			} catch (error) {
				console.log("Error fetching submission: ", error)
			}
		}

		fetchSubmissionDetails(evaluation.submissionId)
	}, [evaluation.submissionId, auth.accessToken])

	useEffect(() => {
		const fetchStudentDetails = async (studentId) => {
			try {
				const studentResponse = await axios.get(`/users/${studentId}`, {
					headers: {
						Authorization: "Bearer " + auth.accessToken
					}
				})
				setStudent(studentResponse.data)
			} catch (error) {
				console.log("Error fetching student: ", error)
			}
		}
		const fetchAssignmentDetails = async (assignmentId) => {
			try {
				const assignmentResponse = await axios.get(`/assignments/${assignmentId}`, {
					headers: {
						Authorization: "Bearer " + auth.accessToken
					}
				})
				setAssignment(assignmentResponse.data)
			} catch (error) {
				console.log("Error fetching assignment: ", error)
			}
		}
		fetchStudentDetails(submission?.createdBy)
		fetchAssignmentDetails(submission?.assignmentId)
	}, [submission])

	console.log(assignment)

	return (
		<div style={{ border: "1px solid #ccc" }}>
			<p><strong>Submission ID:</strong> {evaluation.submissionId}</p>
			<p><strong>Assignment:</strong> {assignment?.title}</p>
			<p><strong>Submitted By:</strong> {student?.email}</p>
			<p><strong>Score:</strong> {evaluation.score}</p>
			<p><strong>Feedback:</strong> {evaluation.feedback}</p>
		</div>
	);
};

export default EvaluationListItem;
