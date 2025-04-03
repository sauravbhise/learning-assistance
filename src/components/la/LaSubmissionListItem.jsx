import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useDownloadFile from "../../utils/downloadFile";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const LaSubmissionListItem = ({ submission }) => {
	const downloadFile = useDownloadFile()

	const { auth } = useAuth()

	const [student, setStudent] = useState(null)
	const [assignment, setAssignment] = useState(null)

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
				console.log("Error fetching student: ", error)
			}
		}
		fetchStudentDetails(submission?.createdBy)
		fetchAssignmentDetails(submission?.assignmentId)
	}, [submission.id])

	return (
		<li>
			<p><strong>Assignment ID: </strong>{assignment?.title}</p>
			<p><strong>Submitted By: </strong>{student?.email}</p>
			<button onClick={() => downloadFile(submission.filePath)}>View File</button>
			<NavLink to={`/la/evaluate/${submission.id}`}>
				<button>Evaluate</button>
			</NavLink>
		</li>
	);
};

export default LaSubmissionListItem;
