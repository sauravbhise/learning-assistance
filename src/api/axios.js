import mockUsers from "../mock/mockUsers"

const register = (email, password) => {
	mockUsers.push({ email, password, role: 'USER' })
}

const login = (email, password) => {

	return mockUsers.find((user) => user.email === email && user.password === password)

}

export { register, login }