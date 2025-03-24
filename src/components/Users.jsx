import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import axios from "../api/axios"

const Users = () => {
	const [users, setUsers] = useState()
	const { auth } = useAuth()

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController()

		const getUsers = async () => {
			try {
				const response = await axios.get("/users", {
					headers: {
						Authorization: "Bearer " + auth.accessToken
					},
				})
				isMounted && setUsers(response.data)
			} catch (error) {
				console.log(error)
			}
		}

		getUsers()

		return () => {
			isMounted = false
			controller.abort()
		}
	}, [])

	return (
		<div>
			<h2>Users</h2>
			{
				users?.length
					? (
						<ul>
							{users.map(user => <li key={user?.id}>{user?.email}</li>)}
						</ul>
					)
					: <p>No Users Found!</p>
			}
		</div>
	)
}

export default Users