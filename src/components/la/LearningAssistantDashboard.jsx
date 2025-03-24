import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getStudentsByLaId, removeStudentFromLa, getAssignmentsByLaId } from "../../api/mock-axios";
import StudentList from "../la/StudentList";
import AssignmentList from "../la/AssignmentList";

const LearningAssistant = () => {
	const { auth } = useAuth();
	const { id: laId } = auth; // LA ID

	const [students, setStudents] = useState([]);
	const [assignments, setAssignments] = useState([]);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const data = await getStudentsByLaId(laId);
				setStudents(data);
			} catch (error) {
				console.error("Error fetching students:", error);
			}
		};

		const fetchAssignments = async () => {
			try {
				const data = await getAssignmentsByLaId(laId);
				setAssignments(data);
			} catch (error) {
				console.error("Error fetching assignments:", error);
			}
		};

		fetchStudents();
		fetchAssignments();
	}, [laId]);

	const handleRemoveStudent = async (studentId) => {
		try {
			await removeStudentFromLa(laId, studentId);
			setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentId));
			console.log(`Removed student with ID: ${studentId}`);
		} catch (error) {
			console.error("Error removing student:", error);
		}
	};

	return (
		<div>
			<h1>Learning Assistant</h1>

			<h3>Your Students</h3>
			<StudentList students={students} onAction={handleRemoveStudent} actionLabel="Remove Student" />

			<NavLink to="/la/addStudent">
				<button>Add Student</button>
			</NavLink>

			<h3>Your Assignments</h3>
			<AssignmentList assignments={assignments} />

			<NavLink to="/la/addAssignment">
				<button>Add Assignment</button>
			</NavLink>
		</div>
	);
};

export default LearningAssistant;
