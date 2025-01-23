import { userService as remote } from './user.service.remote'

function getEmptyUser() {
    return {
        email: "",
        password: "",
        confirmPassword: "",
    }
}

export const userService = { ...remote, getEmptyUser }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local
