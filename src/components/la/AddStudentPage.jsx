import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { addStudentToLa, getAllStudents, getStudentsByLaId } from "../../api/mock-axios";
import StudentList from "../../components/la/StudentList";

const AddStudentPage = () => {
	const { auth } = useAuth();
	const { id: laId } = auth; // LA ID
	const navigate = useNavigate();

	const [students, setStudents] = useState([]);
	const [confirmationMessage, setConfirmationMessage] = useState("");

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				// Fetch all students
				const allStudents = await getAllStudents();

				// Fetch students already assigned to this LA
				const assignedStudents = await getStudentsByLaId(laId);
				const assignedStudentIds = new Set(assignedStudents.map(student => student.id));

				// Filter out students who are already assigned
				const availableStudents = allStudents.filter(student => !assignedStudentIds.has(student.id));

				setStudents(availableStudents);
			} catch (error) {
				console.error("Error fetching students:", error);
			}
		};

		fetchStudents();
	}, [laId]);

	const handleAddStudent = async (studentId) => {
		try {
			const success = addStudentToLa(laId, studentId);
			if (success) {
				const student = students.find((s) => s.id === studentId);
				setConfirmationMessage(`Student added!`);

				// Remove the added student from the list
				setStudents((prevStudents) => prevStudents.filter((s) => s.id !== studentId));

				// Clear message after 3 seconds
				setTimeout(() => setConfirmationMessage(""), 3000);
			}
		} catch (error) {
			console.error("Error adding student:", error);
		}
	};

	return (
		<div>
			<h1>Add Students</h1>

			{confirmationMessage && <p style={{ color: "green" }}>{confirmationMessage}</p>}

			{students.length > 0 ? (
				<StudentList students={students} onAction={handleAddStudent} actionLabel="Add Student" />
			) : (
				<p>No students available to add.</p>
			)}

			<button onClick={() => navigate(-1)}>Go Back</button>
		</div>
	);
};

export default AddStudentPage;
