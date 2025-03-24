import mockDB from "../mock/mockDB"
import { v7 as uuid } from "uuid"
import dayjs from "dayjs"
import ROLES from "../utils/roles"

const register = (email, password) => {
	mockDB.users.push({ email, password, role: 'USER' })
}

const login = (email, password) => {

	return mockDB.users.find((user) => user.email === email && user.password === password)

}

const getAllStudents = () => {
	const students = mockDB.users.filter((user) => user.role === ROLES.STUDENT)
	console.log("students", students)
	return students
}

const getStudentsByLaId = (laId) => {
	const assignedStudentIds = mockDB.la_student_mapping
		.filter(mapping => mapping.la_id === laId)
		.map(mapping => mapping.student_id);

	// Get student details from users array
	return mockDB.users.filter(user => assignedStudentIds.includes(user.id));
}

const addStudentToLa = (laId, studentId) => {
	// Check if the student is already assigned
	const existingMapping = mockDB.la_student_mapping.find(
		(entry) => entry.la_id === laId && entry.student_id === studentId
	);

	if (existingMapping) {
		console.warn(`Student ${studentId} is already assigned to LA ${laId}`);
		return false;
	}

	// Create a new mapping
	const newMapping = {
		id: (mockDB.la_student_mapping.length + 100).toString(), // Generate new ID
		la_id: laId,
		student_id: studentId,
		assigned_at: new Date().toISOString()
	};

	// Add the mapping to the database
	mockDB.la_student_mapping.push(newMapping);
	console.log(`Student ${studentId} assigned to LA ${laId}`);
	return true;
};

const removeStudentFromLa = (laId, studentId) => {
	const index = mockDB.la_student_mapping.findIndex(
		(entry) => entry.la_id === laId && entry.student_id === studentId
	);

	if (index !== -1) {
		// Remove the mapping
		mockDB.la_student_mapping.splice(index, 1);
		console.log(`Student ${studentId} removed from LA ${laId}`);
		return true;
	} else {
		console.error(`Student ${studentId} not found under LA ${laId}`);
		return false;
	}
}


const addSubmission = (assignment_id, student_id, filename) => {

	const now = dayjs()

	mockDB.submissions.push({
		id: uuid(), assignment_id, student_id,
		file_url: `https://example.com/${filename}`, submitted_at: now.format("YYYY"),
		evaluated: false
	})

	console.log(mockDB.submissions)
}

const getSubmissionById = (submissionId) => {
	return mockDB.submissions.find((submission) => submission.id === submissionId)
}

const getEvaluationBySubmissionId = (submissionId) => {
	return mockDB.evaluations.find((evalutation) => evalutation.submission_id === submissionId)
}

const getStudentAssignments = (studentId) => {
	const laMapping = mockDB.la_student_mapping.find(mapping => mapping.student_id === studentId);
	if (!laMapping) return []; // Return empty if no LA found

	const laId = laMapping.la_id;

	return mockDB.assignments.filter(assignment => assignment.la_id === laId)
};

const getAssignmentsByLaId = async (laId) => {
	try {
		const assignments = mockDB.assignments.filter(assignment => assignment.la_id === laId);
		return assignments;
	} catch (error) {
		console.error("Error fetching assignments:", error);
		return [];
	}
};

const addAssignment = async (laId, title, description, fileUrl) => {
	try {
		// Generate a new unique assignment ID
		const newId = (mockDB.assignments.length + 1).toString();

		// Create a new assignment object
		const newAssignment = {
			id: newId,
			title,
			description,
			file_url: fileUrl,
			created_at: new Date().toISOString(),
			la_id: laId
		};

		// Add the new assignment to the mock database
		mockDB.assignments.push(newAssignment);

		console.log("Assignment added:", newAssignment);
		return newAssignment; // Return the newly created assignment
	} catch (error) {
		console.error("Error adding assignment:", error);
		return null;
	}
};

const getStudentSubmissions = (studentId) => {
	return mockDB.submissions.filter(submission => submission.student_id === studentId)
};

export {
	register, login, getStudentsByLaId,
	addSubmission, getSubmissionById, getEvaluationBySubmissionId,
	getStudentAssignments, getStudentSubmissions,
	addStudentToLa, removeStudentFromLa, getAllStudents,
	addAssignment, getAssignmentsByLaId
}