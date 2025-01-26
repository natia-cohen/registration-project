import { httpService } from "../http.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

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
  sendPasswordResetEmail,
  resetPassword,
}

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
    const user = await httpService.post("auth/login", userCred);
    saveLoggedinUser(user);
    return user;
  } catch (err) {
    console.error("Login failed", err);
    throw err;
  }
}

async function signup(userCred) {
  try {
    const user = await httpService.post("auth/signup", userCred);
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

async function sendPasswordResetEmail(email) {
  try {
    const response = await httpService.post("auth/forgot-password", { email });
    return response
  } catch (err) {
    console.error("Error sending password reset email:", err);
    throw err;
  }
}

export async function resetPassword(token, newPassword) {
  try {
    console.log("🔍 Sending request to /auth/reset-password with:", { token, newPassword });

    const response = await httpService.post("auth/reset-password", {
      token: token,
      new_password: newPassword
    })
    console.log("✅ API Response:", response);
    return response
  } catch (err) {
    console.error("Error resetting password:", err);
    throw err;
  }
}


function saveLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    email: user.email,
  };

  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave));
  return userToSave;
}
