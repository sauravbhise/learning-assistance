import mockUsers from "../mock/mockUsers"

const signup = () => {

}

const login = (email, password) => {

	return mockUsers.find((user) => user.email === email && user.password === password)

}

export { login }