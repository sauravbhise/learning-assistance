import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ROLES from "../utils/roles";

const DashboardPage = () => {
	const { auth } = useAuth();
	const { role } = auth;

	return (
		<div>
			<h1>Welcome to the Dashboard</h1>
			<p>Select an option below to get started:</p>

			{role === ROLES.ADMIN && (
				<div>
					<h2>Admin Panel</h2>
					<ul>
						<li><Link to="/admin">Admin Dashboard</Link></li>
					</ul>
				</div>
			)}

			{role === ROLES.LA || role === ROLES.ADMIN && (
				<div>
					<h2>Learning Assistant Panel</h2>
					<ul>
						<li><Link to="/la">LA Dashboard</Link></li>
					</ul>
				</div>
			)}

			{role === ROLES.STUDENT && (
				<div>
					<h2>Student Panel</h2>
					<ul>
						<li><Link to="/student">Student Dashboard</Link></li>
					</ul>
				</div>
			)}

			<button onClick={() => console.log("Logging out...")}>Logout</button>
		</div>
	);
};

export default DashboardPage;
