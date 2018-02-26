// Reducer
// Reducers only update the State
import * as actionType from '../actionTypes/actionTypes';

const app = (state = {
	pageYOffset: 0,
	title: 'Trendings ',
	searchValue: '',
	expandedId: '',
	overlayExpandedId : '',
}, action) => {
		switch (action.type) {
			case actionType.SET_APP_STATE:
				return {
					...state,
					...action.data,
				}
			case actionType.CLEAR_APP_STATE:
				return {
					pageYOffset: 0,	
					title: 'Trendings ',
					searchValue: '',
					expandedId: '',
					overlayExpandedId : '',
									
				}
			
			default:
				return state;
		}
}
export default app;
