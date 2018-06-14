import { createStore, applyMiddleware, combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer';
import ServerKeyReducer from './reducers/serverKeyReducer'
import thunk from 'redux-thunk';




export default function configureStore() {
        const rootReducer = combineReducers({
                loginReducer, ServerKeyReducer
        });

        return createStore(
                rootReducer,
                applyMiddleware(thunk)
	);
}