import {ACTION_SERVERKEY} from '../actions/serverKeyAction';


export default function ServerKeyReducer (state = {serverPublicKey: null}, action) {
    if(action.type == ACTION_SERVERKEY) {
        return {
            ...state,
           serverPublicKey: action.serverPublicKey
        };
    }
    else {
        return state;
    }
}

