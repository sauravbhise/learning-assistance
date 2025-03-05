import React from 'react'
import { useNavigate } from 'react-router-dom'

const UnauthorizedPage = () => {
	const navigate = useNavigate()

	const goBack = () => navigate(-1)

	return (
		<div>
			<h1>Unauthorized Page!</h1>
			<button onClick={goBack}>Go Back</button>
		</div>

	)
}

export default UnauthorizedPage