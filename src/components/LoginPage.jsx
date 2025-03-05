import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { login } from '../api/axios'

const Login = () => {

	const { setAuth } = useAuth()

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || "/"

	const emailRef = useRef()
	const errRef = useRef()

	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [errMsg, setErrMsg] = useState('')

	useEffect(() => {
		emailRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg('')
	}, [email, pwd])

	const handleSubmit = (e) => {
		e.preventDefault()

		const response = login(email, pwd)

		if (response) {
			const { role } = response
			setAuth({ email, pwd, role })
			setEmail('')
			setPwd('')
			navigate(from, { replace: true })
		} else {
			setErrMsg("User Not found!")
		}

	}

	return (

		<div>
			{errMsg && <p ref={errRef}>{errMsg}</p>}

			<h1>Sign In</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email: </label>
				<input
					type="email"
					id='email'
					ref={emailRef}
					autoComplete='off'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
				/>

				<label htmlFor="password">Password: </label>
				<input
					type="password"
					id='password'
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
					required
				/>

				<button>Sign In</button>
			</form>

			{/*Router Link here*/}
			<a href='#'>Sign Up</a>
		</div>

	)
}

export default Login