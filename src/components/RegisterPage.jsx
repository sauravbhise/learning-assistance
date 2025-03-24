import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "../api/axios";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const REGISTER_URL = "/register";

const RegisterPage = () => {
	const emailRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [role, setRole] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg("");
	}, [email, pwd, matchPwd, role]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validEmail || !validPwd || !validMatch) {
			setErrMsg("Invalid Entry");
			errRef.current.focus();
			return;
		}

		try {
			const response = await axios.post(
				REGISTER_URL,
				JSON.stringify({ email, password: pwd, role }),
				{ headers: { "Content-Type": "application/json" } }
			);
			setSuccess(true);
		} catch (error) {
			if (!error?.response) {
				setErrMsg("No Server Response");
			} else if (error.response?.status === 409) {
				setErrMsg("User for this email already exists!");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<div>
					<h1>Success!</h1>
					<NavLink to="/login">Sign In</NavLink>
				</div>
			) : (
				<section>
					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
						{errMsg}
					</p>
					<h1>Register</h1>
					<form onSubmit={handleSubmit}>
						{/* Email */}
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

						{/* Password */}
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							required
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						{pwdFocus && !validPwd && (
							<p>
								Password must be:
								<br />- More than 8 characters
								<br />- Include uppercase & lowercase letters
								<br />- Include a number
								<br />- Include a special character
							</p>
						)}

						{/* Confirm Password */}
						<label htmlFor="confirmPwd">Confirm Password:</label>
						<input
							type="password"
							id="confirmPwd"
							onChange={(e) => setMatchPwd(e.target.value)}
							required
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						{matchFocus && !validMatch && <p>Both passwords must match!</p>}

						{/* Role Selection */}
						<div className="radio">
							<h3>Role</h3>
							<label>
								<input
									type="radio"
									value="ADMIN"
									checked={role === "ADMIN"}
									onChange={(e) => setRole(e.target.value)}
								/>
								Admin
							</label>
						</div>
						<div className="radio">
							<label>
								<input
									type="radio"
									value="LA"
									checked={role === "LA"}
									onChange={(e) => setRole(e.target.value)}
								/>
								Learning Assistant
							</label>
						</div>
						<div className="radio">
							<label>
								<input
									type="radio"
									value="STUDENT"
									checked={role === "STUDENT"}
									onChange={(e) => setRole(e.target.value)}
								/>
								Student
							</label>
						</div>

						<button disabled={!validEmail || !validPwd || !validMatch || !role}>Sign Up</button>
					</form>
				</section>
			)}
		</>
	);
};

export default RegisterPage;
