import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import StudentList from "../../components/la/StudentList";

const AddStudentPage = () => {
	const { auth } = useAuth();
	const { id: laId } = auth;
	const navigate = useNavigate();

	const [students, setStudents] = useState(null);
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				let allStudents = [];
				let assignedStudents = [];

				const allStudentsResponse = await axios.get("/users/students", {
					headers: {
						Authorization: "Bearer " + auth.accessToken
					}
				});

				if (allStudentsResponse.status !== 204 && allStudentsResponse.data.length) {
					allStudents = allStudentsResponse.data;
				}

				const assignedStudentsResponse = await axios.get(`/la/${laId}/students`, {
					headers: {
						Authorization: "Bearer " + auth.accessToken
					}
				});

				if (assignedStudentsResponse.status !== 204 && assignedStudentsResponse.data.length) {
					assignedStudents = assignedStudentsResponse.data;
				}

				const assignedStudentIds = new Set(assignedStudents.map(student => student.id));
				const availableStudents = allStudents.filter(student => !assignedStudentIds.has(student.id));

				setStudents(availableStudents);
			} catch (error) {
				console.error("Error fetching students:", error);
				setStudents([]);
			} finally {
				setLoading(false);
			}
		};

		fetchStudents();
	}, [laId, auth.accessToken]);

	const handleAddStudent = async (studentId) => {
		try {
			await axios.post('/la-students', {
				laId,
				studentId,
				assignedAt: new Date().toISOString()
			}, {
				headers: {
					Authorization: "Bearer " + auth.accessToken,
					"Content-Type": "application/json"
				}
			});

			setConfirmationMessage(`Student added!`);
			setStudents((prevStudents) => prevStudents?.filter((s) => s.id !== studentId) || []);

			setTimeout(() => setConfirmationMessage(""), 3000);
		} catch (error) {
			console.error("Error adding student:", error);
		}
	};

	return (
		<div>
			<h1>Add Students</h1>

			{confirmationMessage && <p style={{ color: "green" }}>{confirmationMessage}</p>}

			{loading ? (
				<p>Loading students...</p>
			) : students?.length > 0 ? (
				<StudentList students={students} onAction={handleAddStudent} actionLabel="Add Student" />
			) : (
				<p>No students available to add.</p>
			)}

			<button onClick={() => navigate(-1)}>Go Back</button>
		</div>
	);
};

export default AddStudentPage;

