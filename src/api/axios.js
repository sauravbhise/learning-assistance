import mockDB from "../mock/mockDB"
import { v7 as uuid } from "uuid"
import dayjs from "dayjs"

const register = (email, password) => {
	mockDB.users.push({ email, password, role: 'USER' })
}

const login = (email, password) => {

	return mockDB.users.find((user) => user.email === email && user.password === password)

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

const getSubmission = (submissionId) => {
	return mockDB.submissions.find((submission) => submission.id === submissionId)
}

const getEvaluation = (submissionId) => {
	return mockDB.evaluations.find((evalutation) => evalutation.submission_id === submissionId)
}

export { register, login, addSubmission, getSubmission, getEvaluation }