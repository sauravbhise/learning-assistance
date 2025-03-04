import { useRef, useState, useEffect } from "react";
import mockUsers from "../mock/mockUsers";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Register = () => {

	const emailRef = useRef()
	const errRef = useRef()

	const [email, setEmail] = useState('')
	const [validEmail, setValidEmail] = useState(false)
	const [emailFocus, setEmailFocus] = useState(false)

	const [pwd, setPwd] = useState('')
	const [validPwd, setValidPwd] = useState(false)
	const [pwdFocus, setPwdFocus] = useState(false)

	const [matchPwd, setMatchPwd] = useState('')
	const [validMatch, setValidMatch] = useState(false)
	const [matchFocus, setMatchFocus] = useState(false)


	const [errMsg, setErrMsg] = useState('')
	const [success, setSuccess] = useState('')

	useEffect(() => {
		emailRef.current.focus()
	}, [])

	useEffect(() => {
		const result = EMAIL_REGEX.test(email)
		console.log(result)
		console.log(email)
		setValidEmail(result)
	}, [email])

	useEffect(() => {
		const result = PWD_REGEX.test(pwd)
		console.log(result)
		console.log(pwd)
		setValidPwd(result)
		const match = pwd === matchPwd
		setValidMatch(match)
	}, [pwd, matchPwd])

	useEffect(() => {
		setErrMsg('')
	}, [email, pwd, matchPwd])

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(mockUsers)
		mockUsers.push({ email, password: pwd, role: 'USER' })
		console.log(mockUsers)
		setSuccess(true)
	}

	return (
		<>
			{
				success ?
					(
						<div>
							<h1>Success!</h1>
							<p>Sign In</p>
						</div>
					)
					:
					(
						<section>
							<p
								ref={errRef}
								className={errMsg ? "errmsg" : "offscreen"}
							> {errMsg}
							</p>
							<h1>Register</h1>
							<form onSubmit={handleSubmit}>
								<label htmlFor="email">Email:</label>
								<input
									type="email"
									id="email"
									ref={emailRef}
									autoComplete="off"
									onChange={(e) => setEmail(e.target.value)}
									required
									onFocus={() => setEmailFocus(true)}
									onBlur={() => setEmailFocus(false)}
								/>
								{emailFocus && email && !validEmail && <p>Please enter a valid email!</p>}


								<label htmlFor="password">Password:</label>
								<input
									type="password"
									id="password"
									onChange={(e) => setPwd(e.target.value)}
									required
									onFocus={() => setPwdFocus(true)}
									onBlur={() => setPwdFocus(false)}
								/>
								{pwdFocus && !validPwd &&
									<p>
										Password must be:
										More than 8 characters
										Must include uppercase & lowercase letters
										Must include a number
										Must include a special character
									</p>}

								<label htmlFor="confirmPwd">Confirm Password:</label>
								<input
									type="password"
									id="confirmPwd"
									onChange={(e) => setMatchPwd(e.target.value)}
									required
									onFocus={() => setMatchFocus(true)}
									onBlur={() => setMatchFocus(false)}
								/>
								{matchFocus && !validMatch && <p>Both Passwords must match!</p>}

								<button
									disabled={!validEmail || !validPwd || !validMatch}
								> Sign Up
								</button>
							</form>



						</section>

					)
			}
		</>
	)
}


export default Register