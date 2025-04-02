import React from "react";
import { useNavigate } from "react-router-dom";

const LaList = ({ las, onRemoveUser }) => {
	const navigate = useNavigate();

	return (
		<div>
			<h3>Learning Assistants</h3>
			{las.length ? (
				<ul>
					{las.map((la) => (
						<li key={la.id}>
							{la.name} - {la.email}
							<button onClick={() => navigate(`/la/${la.id}/students`)}>View Assigned Students</button>
							<button onClick={() => onRemoveUser(la.id)} style={{ marginLeft: "10px", color: "red" }}>Remove</button>
						</li>
					))}
				</ul>
			) : (
				<p>No Learning Assistants Found!</p>
			)}
		</div>
	);
};

export default LaList;

