// Reducer
// Reducers only update the stats
import { combineReducers } from 'redux';
import app from './app';
import gifs from './gifs';



const rootReducer = combineReducers({
	app,
	gifs
});

export default rootReducer;
