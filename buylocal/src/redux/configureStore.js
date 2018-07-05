import { createStore, applyMiddleware, combineReducers } from 'redux';
import LoginReducer from './reducers/loginReducer';
import ServerKeyReducer from './reducers/serverKeyReducer'
import CatsReducer from './reducers/catsReducer'
import thunk from 'redux-thunk';




export default function configureStore() {
        const rootReducer = combineReducers({
                LoginReducer, ServerKeyReducer, CatsReducer
        });

        return createStore(
                rootReducer,
                applyMiddleware(thunk)
	);
}