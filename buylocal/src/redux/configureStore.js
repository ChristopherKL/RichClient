import { createStore, applyMiddleware, combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer';
import APIConnReducer from './reducers/APIConnReducer'
import thunk from 'redux-thunk';

export default function configureStore() {
        return createStore(
        combineReducers({ loginReducer, APIConnReducer}),
        applyMiddleware(thunk)
	);
}