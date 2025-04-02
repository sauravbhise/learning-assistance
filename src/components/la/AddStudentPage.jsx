import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import StudentList from "../../components/la/StudentList";

const AddStudentPage = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const { laId } = useParams();

	const [students, setStudents] = useState(null);
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUnassignedStudents = async () => {
			try {
				const response = await axios.get("/users/students/unassigned", {
					headers: {
						Authorization: "Bearer " + auth.accessToken
					}
				});

				setStudents(response.status !== 204 && response.data.length ? response.data : []);
			} catch (error) {
				console.error("Error fetching unassigned students:", error);
				setStudents([]);
			} finally {
				setLoading(false);
			}
		};

		fetchUnassignedStudents();
	}, [auth.accessToken]);

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

			setConfirmationMessage("Student added!");
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

