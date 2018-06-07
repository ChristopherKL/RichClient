import {ACTION_LOGIN, loginActionCreator} from '../actions/loginAction';


export default function loginReducer (state = {loggedIn: false, userData: null}, action) {
    if(action.type == ACTION_LOGIN) {
        return {
            ...state,
           loggedIn: true, userData: action.userData
        };
    }
    else {
        return state;
    }
}

