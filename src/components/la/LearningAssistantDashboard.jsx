import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import StudentList from "../la/StudentList";
import AssignmentList from "../la/AssignmentList";

const LearningAssistant = () => {
	const { auth } = useAuth();
	const { id: laId } = auth;

	const [students, setStudents] = useState(null);
	const [assignments, setAssignments] = useState(null);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await axios.get(`/la/${laId}/students`, {
					headers: {
						Authorization: "Bearer " + auth.accessToken,
					}
				});

				if (response.status === 204) {
					setStudents(null);
				} else {
					setStudents(response.data);
				}
			} catch (error) {
				console.error("Error fetching students:", error);
				setStudents(null);
			}
		};

		const fetchAssignments = async () => {
			try {
				const response = await axios.get(`/users/${laId}/assignments`, {
					headers: {
						Authorization: "Bearer " + auth.accessToken,
					}
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

		fetchStudents();
		fetchAssignments();
	}, [laId, auth.accessToken]);

	const handleRemoveStudent = async (studentId) => {
		try {
			const mappingResponse = await axios.get(`/la-students/${laId}/students/${studentId}`, {
				headers: {
					Authorization: "Bearer " + auth.accessToken
				}
			})
			const mappingId = mappingResponse.data.id;

			await axios.delete(`/la-students/${mappingId}`, {
				headers: {
					Authorization: "Bearer " + auth.accessToken,
				}
			});
			setStudents((prevStudents) => prevStudents?.filter(student => student.id !== studentId) || null);
			console.log(`Removed student with ID: ${studentId}`);
		} catch (error) {
			console.error("Error removing student:", error);
		}
	};

	const handleRemoveAssignment = async (assignmentId) => {
		try {
			await axios.delete(`/assignments/${assignmentId}`, {
				headers: {
					Authorization: "Bearer " + auth.accessToken,
				},
			});

			setAssignments((prevAssignments) =>
				prevAssignments?.filter((assignment) => assignment.id !== assignmentId) || null
			);
			console.log(`Removed assignment with ID: ${assignmentId}`);
		} catch (error) {
			console.error("Error removing assignment:", error);
		}
	};

	return (
		<div>
			<h1>Learning Assistant</h1>

			<h3>Your Students</h3>
			{students ? (
				<StudentList students={students} onAction={handleRemoveStudent} actionLabel="Remove Student" />
			) : (
				<p>No Students Assigned</p>
			)}

			<NavLink to="/la/addStudent">
				<button>Add Student</button>
			</NavLink>

			<h3>Your Assignments</h3>
			{assignments ? (
				<AssignmentList assignments={assignments} onRemoveAssignment={handleRemoveAssignment} />
			) : (
				<p>No Assignments</p>
			)}

			<NavLink to="/la/addAssignment">
				<button>Add Assignment</button>
			</NavLink>
		</div>
	);
};

export default LearningAssistant;
