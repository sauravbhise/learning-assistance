import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import StudentList from '../la/StudentList';
import axios from '../../api/axios';

const LaStudentMapping = () => {
	const { auth } = useAuth();
	const { id: adminId } = auth;
	const navigate = useNavigate();
	const [students, setStudents] = useState(null);
	const { laId } = useParams();

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

		fetchStudents();
	}, [adminId, laId, auth.accessToken]);

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

	return (
		<div>
			<h3>Assigned Students</h3>
			{students ? (
				<StudentList students={students} onAction={handleRemoveStudent} actionLabel="Remove Student" />
			) : (
				<p>No Students Assigned</p>
			)}

			<NavLink to={`/la/${laId}/addStudent`}>
				<button>Add Student</button>
			</NavLink>

			<button onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
				Go Back
			</button>
		</div>
	);
};

export default LaStudentMapping;
