import React, { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { login } from '../api/axios'

const Login = () => {

	const { setAuth } = useContext(AuthContext)

	const emailRef = useRef()
	const errRef = useRef()

	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [errMsg, setErrMsg] = useState('')
	const [success, setSuccess] = useState(false)

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
			setSuccess(true)
		} else {
			setErrMsg("User Not found!")
			errRef.current.focus()
		}

	}

	return (
		<>
			{
				success ?
					(
						<div>
							<h1>Logged In!</h1>
						</div>
					)
					:
					(
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
					)}
		</>
	)
}

export default Login