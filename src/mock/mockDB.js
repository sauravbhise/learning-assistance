const mockDB = {
	"users": [
		{ "id": "1", "email": "admin@example.com", "password": "admin123", "role": "ADMIN" },
		{ "id": "2", "email": "la@example.com", "password": "la123", "role": "LA" },
		{ "id": "3", "email": "student1@example.com", "password": "student123", "role": "STUDENT" },
		{ "id": "4", "email": "student2@example.com", "password": "student123", "role": "STUDENT" }
	],
	"la_student_mapping": [
		{ "id": "100", "la_id": "2", "student_id": "3", "assigned_at": "2025-03-06T12:00:00Z" },
		{ "id": "101", "la_id": "2", "student_id": "4", "assigned_at": "2025-03-06T12:05:00Z" }
	],
	"assignments": [
		{ "id": "200", "title": "Math Assignment 1", "description": "Solve algebra problems", "file_url": "https://example.com/algebra.pdf", "created_at": "2025-03-06T13:00:00Z", "la_id": "2" }
	],
	"submissions": [
		{ "id": "300", "assignment_id": "200", "student_id": "3", "file_url": "https://example.com/student1_submission.pdf", "submitted_at": "2025-03-07T10:00:00Z", "evaluated": true },
		{ "id": "301", "assignment_id": "200", "student_id": "4", "file_url": "https://example.com/student2_submission.pdf", "submitted_at": "2025-03-07T11:00:00Z", "evaluated": true }
	],
	"evaluations": [
		{ "id": "400", "submission_id": "300", "la_id": "2", "feedback": "Good job!", "score": 85, "evaluated_at": "2025-03-08T14:00:00Z" },
		{ "id": "401", "submission_id": "301", "la_id": "2", "feedback": "Needs improvement.", "score": 70, "evaluated_at": "2025-03-08T15:00:00Z" }
	]
}


export default mockDB