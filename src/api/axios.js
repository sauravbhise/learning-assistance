import mockDB from "../mock/mockDB"

const register = (email, password) => {
	mockDB.users.push({ email, password, role: 'USER' })
}

const login = (email, password) => {

	return mockDB.users.find((user) => user.email === email && user.password === password)

}

export { register, login }