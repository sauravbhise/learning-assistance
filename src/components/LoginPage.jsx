import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'

const LOGIN_URL = "/login"

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

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {

			const response = await axios.post(LOGIN_URL,
				JSON.stringify({ email, password: pwd }),
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)

			const accessToken = response?.data?.accessToken
			const role = response?.data?.role
			const id = response?.data?.id

			if (response) {
				setAuth({ id, email, pwd, role, accessToken })
				setEmail('')
				setPwd('')
				navigate(from, { replace: true })
			} else {
				setErrMsg("User Not found!")
			}
		} catch (error) {
			if (!error?.response) {
				setErrMsg("No Server Response")
			} else if (error.response?.status === 400) {
				setErrMsg("Missing Username or Password")
			} else if (error.response?.status === 401) {
				setErrMsg("Unauthorized")
			} else {
				setErrMsg("Login Failed")
			}
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

		</div>

	)
}

export default Login