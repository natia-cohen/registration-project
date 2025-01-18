import { userService as remote } from './user.service.remote';

function getEmptyUser() {
    return {
        username: '', 
        password: '',
        email:'', 
        fullname: '',
        isAdmin: false,
    };
}

export const userService = { ...remote, getEmptyUser };

// Easy access to this service from the dev tools console
// when using script - dev / dev:local
