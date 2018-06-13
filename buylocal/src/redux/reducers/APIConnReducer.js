import {ACTION_INITAPICONN, initAPIConnActionCreator} from '../actions/initAPIConnAction';


export default function APIConnReducer (state = {APIConn: null}, action) {
    if(action.type == ACTION_INITAPICONN) {
        return {
            ...state,
           APIConn: action.APIConn
        };
    }
    else {
        return state;
    }
}

