import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
    getLoggedinUser,
    saveLoggedinUser,
}

function getUsers() {
	return httpService.get(`user`)
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`)
	return user
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
	const user = await httpService.put(`user/${_id}`, { _id, score })

    const loggedinUser = getLoggedinUser() 
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

	return user
}

async function login(userCred) {
	console.log(userCred)
	const user = await httpService.post('auth/login', userCred)
	if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
	console.log(userCred)
    const user = await httpService.post('auth/signup', userCred)
	return saveLoggedinUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	user = { 
        _id: user._id,
		username:user.username,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword, 
    }
	
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}
