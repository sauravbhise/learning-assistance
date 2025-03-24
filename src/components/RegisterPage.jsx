import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "../api/axios";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const REGISTER_URL = "/register";

const RegisterPage = () => {
	const emailRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate();
	const location = useLocation();

	const fromUsersPage = location.state?.fromUsersPage || false;

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);
	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [role, setRole] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (!fromUsersPage) {
			navigate("/login", { replace: true });
		} else {
			emailRef.current.focus();
		}
	}, [fromUsersPage, navigate]);

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
		if (!validEmail || !validPwd || !validMatch || !role) {
			setErrMsg("Invalid Entry");
			errRef.current.focus();
			return;
		}

		try {
			await axios.post(
				REGISTER_URL,
				JSON.stringify({ email, password: pwd, role }),
				{ headers: { "Content-Type": "application/json" } }
			);

			setSuccess(true);

			setTimeout(() => {
				navigate(fromUsersPage ? "/admin" : "/login"); // Redirect accordingly
			}, 2000);
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
					<p>Redirecting...</p>
				</div>
			) : (
				<section>
					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
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
						/>
						{!validEmail && email && <p>Please enter a valid email!</p>}

						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							required
						/>
						{!validPwd && pwd && (
							<p>Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.</p>
						)}

						<label htmlFor="confirmPwd">Confirm Password:</label>
						<input
							type="password"
							id="confirmPwd"
							onChange={(e) => setMatchPwd(e.target.value)}
							required
						/>
						{!validMatch && matchPwd && <p>Passwords must match!</p>}

						<h3>Role</h3>
						<label>
							<input type="radio" value="LA" checked={role === "LA"} onChange={(e) => setRole(e.target.value)} />
							Learning Assistant
						</label>
						<label>
							<input type="radio" value="STUDENT" checked={role === "STUDENT"} onChange={(e) => setRole(e.target.value)} />
							Student
						</label>

						<button disabled={!validEmail || !validPwd || !validMatch || !role}>Sign Up</button>
					</form>

					<button onClick={() => navigate("/admin")}>Cancel</button>
				</section>
			)}
		</>
	);
};

export default RegisterPage;

