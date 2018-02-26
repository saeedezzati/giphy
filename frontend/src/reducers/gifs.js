// Reducer
// Reducers only update the State
import * as actionType from '../actionTypes/actionTypes';

const app = (state = {
	isFetching: false,
	pagination:{},
	col1: [],
	col2: [],  
	col3: [], 
	col4: [],  

}, action) => {
		switch (action.type) {
			case actionType.REQUEST_TRENDINGS:
			case actionType.REQUEST_SEARCH:
				return {
					...state,
					isFetching: true,        
				}
			case actionType.RECEIVE_TRENDINGS:
			case actionType.RECEIVE_SEARCH:
				return {
					...state,
					isFetching: false,        
					pagination: action.data.pagination,
					col1: state.col1.concat(action.data.data.slice(0,action.data.data.length/4)),	
			        col2: state.col2.concat(action.data.data.slice(action.data.data.length/4,action.data.data.length/4*2)),	
			        col3: state.col3.concat(action.data.data.slice(action.data.data.length/4*2,action.data.data.length/4*3)),	
			        col4: state.col4.concat(action.data.data.slice(action.data.data.length/4*3,action.data.data.length)),	
									
				}
			case actionType.CLEAR_GIFS:
				return {
					isFetching: false,
					pagination:{},
					col1: [],
					col2: [],  
					col3: [], 
					col4: [], 
				}
			
			default:
				return state;
		}
}
export default app;
