import {ACTION_CATS} from '../actions/catsAction';


export default function CatsReducer (state = {cats: null}, action) {
    if(action.type == ACTION_CATS) {
        return {
            ...state,
           cats: action.cats
        };
    }
    else {
        return state;
    }
}

