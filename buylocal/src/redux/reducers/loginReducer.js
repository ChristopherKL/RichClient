import {ACTION_LOGIN, ACTION_LOGOUT} from '../actions/loginAction';


export default function LoginReducer (state = {loggedIn: false, userData: null}, action) {
    if(action.type == ACTION_LOGIN) {
        return {
            ...state,
           loggedIn: true, userData: action.userData
        };
    }
    if(action.type == ACTION_LOGOUT) {
        return {
            ...state,
           loggedIn: false, userData: null
        };
    }
    else {
        return state;
    }
}

