import { userService } from '../../services/user'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const REMOVE_USER = 'REMOVE_USER'

const initialState = {
    user: userService.getLoggedinUser() || null,
    users: [],
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case SET_USERS:
            return { ...state, users: action.users }
        case REMOVE_USER:
            return { 
                ...state, 
                users: state.users.filter(user => user._id !== action.userId)
            }
        default:
            return state
    }
}
