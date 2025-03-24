import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import UserList from "./UserList";

const Users = () => {
	const { auth } = useAuth();
	const navigate = useNavigate(); // Used to navigate to the AddUser page
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

	// Handlers for removing LAs and Students
	const handleRemoveLA = async (id) => {
		try {
			const response = await axios.delete(`/users/${id}`, {
				headers: {
					Authorization: "Bearer " + auth.accessToken
				}
			})
			setLAs((prev) => prev.filter((user) => user.id !== id));
		} catch (error) {
			console.log(error)
		}
	};

	const handleRemoveStudent = async (id) => {
		try {
			const response = await axios.delete(`/users/${id}`, {
				headers: {
					Authorization: "Bearer " + auth.accessToken
				}
			})
			setStudents((prev) => prev.filter((user) => user.id !== id));
		} catch (error) {

		}
	};

	return (
		<div>

			<h3>Admins</h3>
			{admins.length ? <UserList users={admins} isRemovable={false} /> : <p>No Admins Found!</p>}

			<h3>Learning Assistants</h3>
			{las.length ? <UserList users={las} onRemoveUser={handleRemoveLA} isRemovable={true} /> : <p>No LAs Found!</p>}

			<h3>Students</h3>
			{students.length ? <UserList users={students} onRemoveUser={handleRemoveStudent} isRemovable={true} /> : <p>No Students Found!</p>}

			<button onClick={() => navigate("/register", { state: { fromUsersPage: true } })}>
				Add User
			</button>

		</div>
	);
};

export default Users;

