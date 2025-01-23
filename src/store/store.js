import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux"
import {thunk} from "redux-thunk"
import { userReducer } from "./reducers/user.reducer";

const rootReducer = combineReducers({
  userModule: userReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(thunk))

export const store = createStore(rootReducer, middleware)



