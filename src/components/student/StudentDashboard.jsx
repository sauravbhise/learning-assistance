import React, { useEffect, useState } from "react";
import AssignmentList from "./AssignmentList";
import SubmissionList from "./SubmissionList";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const StudentDashboard = () => {
	const { auth } = useAuth();
	const { id } = auth;

	const [assignments, setAssignments] = useState(null);
	const [submissions, setSubmissions] = useState(null);

	useEffect(() => {
		const fetchAssignments = async () => {
			try {
				const response = await axios.get(`/users/${id}/assignments`, {
					headers: {
						Authorization: "Bearer " + auth.accessToken,
					},
				});

				if (response.status === 204) {
					setAssignments(null);
				} else {
					setAssignments(response.data);
				}
			} catch (error) {
				console.error("Error fetching assignments:", error);
				setAssignments(null);
			}
		};

		const fetchSubmissions = async () => {
			try {
				const response = await axios.get(`/users/${id}/submissions`, {
					headers: {
						Authorization: "Bearer " + auth.accessToken,
					},
				});

				if (response.status === 204) {
					setSubmissions(null);
				} else {
					setSubmissions(response.data);
				}
			} catch (error) {
				console.error("Error fetching submissions:", error);
				setSubmissions(null);
			}
		};

		fetchAssignments();
		fetchSubmissions();
	}, [id, auth.accessToken]);

	return (
		<div>
			<h1>Student Dashboard</h1>

			{assignments ? <AssignmentList assignments={assignments} /> : <p>No Assignments</p>}

			{submissions ? <SubmissionList submissions={submissions} /> : <p>No Submissions</p>}
		</div>
	);
};

export default StudentDashboard;
