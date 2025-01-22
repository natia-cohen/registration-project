import { httpService } from '../http.service';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

export const userService = {
    login,
    signup,
    logout,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
};

function getUsers() {
    return httpService.get(`user`);
}

async function getById(userId) {
    return await httpService.get(`user/${userId}`);
}


function remove(userId) {
    return httpService.delete(`user/${userId}`);
}


async function update(user) {
    const updatedUser = await httpService.put(`user/${user._id}`, user);

    const loggedinUser = getLoggedinUser();
    if (loggedinUser && loggedinUser._id === updatedUser._id) {
        saveLoggedinUser(updatedUser);
    }

    return updatedUser;
}


async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred);
        saveLoggedinUser(user);
        return user;
    } catch (err) {
        console.error("Login failed", err);
        throw err;
    }
}


async function signup(userCred) {
    try {
        const user = await httpService.post('auth/signup', userCred);
        saveLoggedinUser(user);
        return user;
    } catch (err) {
        console.error("Signup failed", err);
        throw err;
    }
}


async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}


function saveLoggedinUser(user) {
    const userToSave = {
        _id: user._id,
        email: user.email, 
    };

    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave));
    return userToSave;
}
