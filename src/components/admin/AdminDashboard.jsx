import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import AdminList from "./AdminList";
import LaList from "./LaList";
import StudentList from "./StudentList";

const AdminDashboard = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [admins, setAdmins] = useState([]);
	const [las, setLAs] = useState([]);
	const [students, setStudents] = useState([]);

	useEffect(() => {
		const fetchUsers = async (endpoint, setter) => {
			try {
				const response = await axios.get(endpoint, {
					headers: { Authorization: "Bearer " + auth.accessToken },
				});
				setter(response.data);
			} catch (error) {
				console.error(`Error fetching ${endpoint}:`, error);
			}
		};

		fetchUsers("/users/admins", setAdmins);
		fetchUsers("/users/las", setLAs);
		fetchUsers("/users/students", setStudents);
	}, [auth.accessToken]);

	const handleRemoveLA = async (id) => {
		try {
			await axios.delete(`/users/${id}`, {
				headers: { Authorization: "Bearer " + auth.accessToken },
			});
			setLAs((prev) => prev.filter((user) => user.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveStudent = async (id) => {
		try {
			await axios.delete(`/users/${id}`, {
				headers: { Authorization: "Bearer " + auth.accessToken },
			});
			setStudents((prev) => prev.filter((user) => user.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<AdminList admins={admins} />
			<LaList las={las} onRemoveUser={handleRemoveLA} />
			<StudentList students={students} onRemoveUser={handleRemoveStudent} />
			<button onClick={() => navigate("/register", { state: { fromUsersPage: true } })}>Add User</button>
			<button onClick={() => navigate(-1)}>Go Back</button>
		</div>
	);
};

export default AdminDashboard;