import React from 'react'
import { useParams } from 'react-router-dom'
import { getSubmissionById, getEvaluationBySubmissionId } from '../../api/mock-axios'

const SubmissionPage = () => {

	const { submissionId } = useParams()
	const submission = getSubmissionById(submissionId)
	const { id, file_url, evaluated } = submission

	let feedback, score

	if (evaluated) {
		const evaluation = getEvaluationBySubmissionId(id)
		if (evaluation) {
			feedback = evaluation.feedback
			score = evaluation.score
		}
	}


	return (
		<div>
			<h1>Submission</h1>
			<p>{id}</p>
			<a href={submission.file_url} target="_blank" rel="noopener noreferrer">
				<button>View File</button>
			</a>
			<h3>Evaluation</h3>
			{evaluated
				? <div>
					<p>Score: {score}</p>
					<p>Feedback: {feedback}</p>
				</div>
				: <div>
					<p>Evaluation Pending!</p>
				</div>
			}
		</div>
	)
}

export default SubmissionPage