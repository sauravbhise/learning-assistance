import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ROLES from "../utils/roles";

const DashboardPage = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		setAuth({});

		navigate("/login", { replace: true });
	};

	return (
		<div>
			<h1>Welcome to the Dashboard</h1>
			<p>Select an option below to get started:</p>

			{auth.role === ROLES.ADMIN && (
				<div>
					<h2>Admin Panel</h2>
					<ul>
						<li><Link to="/admin">Admin Dashboard</Link></li>
					</ul>
				</div>
			)}

			{(auth.role === ROLES.LA || auth.role === ROLES.ADMIN) && (
				<div>
					<h2>Learning Assistant Panel</h2>
					<ul>
						<li><Link to="/la">LA Dashboard</Link></li>
					</ul>
				</div>
			)}

			{auth.role === ROLES.STUDENT && (
				<div>
					<h2>Student Panel</h2>
					<ul>
						<li><Link to="/student">Student Dashboard</Link></li>
					</ul>
				</div>
			)}

			<button onClick={handleLogout} style={{ marginTop: "20px" }}>Logout</button>
		</div>
	);
};

export default DashboardPage;
