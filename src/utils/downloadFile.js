import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const useDownloadFile = () => {
	const { auth } = useAuth();

	const downloadFile = async (filePath) => {
		try {
			const response = await axios.get("/uploads", {
				params: { filePath },
				responseType: "blob",
				headers: {
					Authorization: `Bearer ${auth?.accessToken}`,
				},
			});

			const blob = new Blob([response.data]);
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.setAttribute("download", filePath.split("/").pop()); // Extract filename
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error("Error downloading file:", error);
			alert("Failed to download the file. Please try again.");
		}
	};

	return downloadFile;
};

export default useDownloadFile;
