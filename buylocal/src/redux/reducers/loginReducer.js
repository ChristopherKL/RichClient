import {ACTION_LOGIN, loginActionCreator, ACTION_LOGOUT, logoutActionCreator} from '../actions/loginAction';


export default function loginReducer (state = {loggedIn: false, userData: null}, action) {
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

