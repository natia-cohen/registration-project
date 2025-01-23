import { userService } from "../../services/user";
import {store} from "../store";
import { SET_USER, SET_USERS, REMOVE_USER } from "../reducers/user.reducer";

export async function loadUsers() {
  try {
    const users = await userService.getUsers();
    store.dispatch({ type: SET_USERS, users });
  } catch (err) {
    console.error("UserActions: error in loadUsers", err);
  }
}

export async function removeUser(userId) {
  try {
    await userService.remove(userId);
    store.dispatch({ type: REMOVE_USER, userId });
  } catch (err) {
    console.error("UserActions: error in removeUser", err);
  }
}

export async function login(credentials) {
  try {
    const user = await userService.login(credentials);
    store.dispatch({ type: SET_USER, user });
    return user;
  } catch (err) {
    console.error("Cannot login", err);
    throw err;
  }
}

export function signup(credentials) {
  return async (dispatch) => {
    try {
      console.log("📤 Sending signup request:", credentials);
      const user = await userService.signup(credentials);
      console.log("✅ Signup successful, user:", user);

      dispatch({ type: SET_USER, user });
      console.log("🟢 Dispatched SET_USER to Redux store", user);

      return user;
    } catch (err) {
      console.error("❌ Cannot signup", err);
      throw err;
    }
  };
}

export async function logout() {
  try {
    await userService.logout();
    store.dispatch({ type: SET_USER, user: null });
  } catch (err) {
    console.error("Cannot logout", err);
    throw err;
  }
}
