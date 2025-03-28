import React from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const AssignmentListItem = ({ assignment, onRemoveAssignment }) => {
	const { auth } = useAuth();

	const handleDownloadFile = async () => {
		try {
			const response = await axios.get("/uploads", {
				params: { filePath: assignment.filePath },
				responseType: "blob",
				headers: {
					Authorization: `Bearer ${auth?.accessToken}`,
				},
			});

			const blob = new Blob([response.data]);
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.setAttribute("download", assignment.filePath.split("/").pop()); // Extract filename
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error("Error downloading file:", error);
			alert("Failed to download the file. Please try again.");
		}
	};

	return (
		<li>
			<strong>{assignment.title}</strong> - {assignment.description}
			<button onClick={handleDownloadFile}>Download File</button>
			<button onClick={() => onRemoveAssignment(assignment.id)} style={{ marginLeft: "10px", color: "red" }}>
				Delete Assignment
			</button>
		</li>
	);
};

export default AssignmentListItem;

