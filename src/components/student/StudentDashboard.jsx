import React, { useEffect, useState } from "react";
import AssignmentList from "./AssignmentList";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const StudentDashboard = () => {
	const { auth } = useAuth();
	const { id } = auth;

	const [pendingAssignments, setPendingAssignments] = useState(null);
	const [completedAssignments, setCompletedAssignments] = useState(null);

	useEffect(() => {
		const fetchAssignments = async () => {
			try {
				const pendingResponse = await axios.get(`/students/${id}/assignments/pending`, {
					headers: { Authorization: "Bearer " + auth.accessToken },
				});
				setPendingAssignments(pendingResponse.status === 204 ? null : pendingResponse.data);

				const completedResponse = await axios.get(`/students/${id}/assignments/completed`, {
					headers: { Authorization: "Bearer " + auth.accessToken },
				});
				setCompletedAssignments(completedResponse.status === 204 ? null : completedResponse.data);
			} catch (error) {
				console.error("Error fetching assignments:", error);
				setPendingAssignments(null);
				setCompletedAssignments(null);
			}
		};

		fetchAssignments();
	}, [id, auth.accessToken]);

	return (
		<div>
			<h1>Student Dashboard</h1>

			<h3>Pending Assignments</h3>
			{pendingAssignments ? (
				<AssignmentList assignments={pendingAssignments} actionLabel="Upload" />
			) : (
				<p>No Pending Assignments</p>
			)}

			<h3>Completed Assignments</h3>
			{completedAssignments ? (
				<AssignmentList assignments={completedAssignments} actionLabel="View" />
			) : (
				<p>No Completed Assignments</p>
			)}
		</div>
	);
};

export default StudentDashboard;