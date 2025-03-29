import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import StudentList from "../la/StudentList";
import AssignmentList from "../la/AssignmentList";
import LaSubmissionList from "../la/LaSubmissionList";
import EvaluationList from "../la/EvaluationList";

const LearningAssistant = () => {
	const { auth } = useAuth();
	const { id: laId } = auth;

	const [students, setStudents] = useState(null);
	const [assignments, setAssignments] = useState(null);
	const [submissions, setSubmissions] = useState([]);
	const [evaluations, setEvaluations] = useState([]);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await axios.get(`/la/${laId}/students`, {
					headers: { Authorization: "Bearer " + auth.accessToken }
				});
				setStudents(response.status === 204 ? null : response.data);
			} catch (error) {
				console.error("Error fetching students:", error);
				setStudents(null);
			}
		};

		const fetchAssignments = async () => {
			try {
				const response = await axios.get(`/users/${laId}/assignments`, {
					headers: { Authorization: "Bearer " + auth.accessToken }
				});
				setAssignments(response.status === 204 ? null : response.data);
			} catch (error) {
				console.error("Error fetching assignments:", error);
				setAssignments(null);
			}
		};

		const fetchSubmissions = async () => {
			try {
				const response = await axios.get(`/la/${laId}/submissions`, {
					headers: { Authorization: "Bearer " + auth.accessToken }
				});
				setSubmissions(response.status === 204 ? [] : response.data);
			} catch (error) {
				console.error("Error fetching submissions:", error);
				setSubmissions([]);
			}
		};

		const fetchEvaluations = async () => {
			try {
				const response = await axios.get(`/users/${laId}/evaluations`, {
					headers: { Authorization: "Bearer " + auth.accessToken }
				});
				setEvaluations(response.status === 204 ? [] : response.data);
			} catch (error) {
				console.error("Error fetching evaluations:", error);
				setEvaluations([]);
			}
		};

		fetchStudents();
		fetchAssignments();
		fetchSubmissions();
		fetchEvaluations();
	}, [laId, auth.accessToken]);

	const handleRemoveStudent = async (studentId) => {
		try {
			const mappingResponse = await axios.get(`/la-students/${laId}/students/${studentId}`, {
				headers: { Authorization: "Bearer " + auth.accessToken }
			});
			const mappingId = mappingResponse.data.id;

			await axios.delete(`/la-students/${mappingId}`, {
				headers: { Authorization: "Bearer " + auth.accessToken }
			});
			setStudents(prev => prev?.filter(student => student.id !== studentId) || null);
			console.log(`Removed student with ID: ${studentId}`);
		} catch (error) {
			console.error("Error removing student:", error);
		}
	};

	const handleRemoveAssignment = async (assignmentId) => {
		try {
			await axios.delete(`/assignments/${assignmentId}`, {
				headers: { Authorization: "Bearer " + auth.accessToken }
			});
			setAssignments(prev => prev?.filter(assignment => assignment.id !== assignmentId) || null);
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

			<h3>Submissions to Evaluate</h3>
			<LaSubmissionList submissions={submissions} />

			<h3>Your Evaluations</h3>
			<EvaluationList evaluations={evaluations} />
		</div>
	);
};

export default LearningAssistant;


