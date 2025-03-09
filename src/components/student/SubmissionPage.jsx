import React from 'react'
import { useParams } from 'react-router-dom'
import { getSubmission, getEvaluation } from '../../api/axios'

const SubmissionPage = () => {

	const { submissionId } = useParams()
	const submission = getSubmission(submissionId)
	const { id, file_url, evaluated } = submission

	let feedback, score

	if (evaluated) {
		const evaluation = getEvaluation(id)
		if (evaluation) {
			feedback = evaluation.feedback
			score = evaluation.score
		}
	}


	return (
		<div>
			<h1>Submission</h1>
			<p>{id}</p>
			<button>
				<a href={file_url}>
					View File
				</a>
			</button>
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