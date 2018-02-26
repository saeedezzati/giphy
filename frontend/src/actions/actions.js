//Actions
import * as actionType from '../actionTypes/actionTypes';

// APP Actions
export const setAppState = (data) => {
  return {
    type: actionType.SET_APP_STATE,
    data
  }
}
export const clearAppState = () => {
  return {
    type: actionType.CLEAR_APP_STATE,
  }
}


// GIPHY Actions
export const requestTrendings = (data) => {
  return {
    type: actionType.REQUEST_TRENDINGS,
    data
  }
}
export const receiveTrendings = (data) => {
  return {
    type: actionType.RECEIVE_TRENDINGS,
    data
  }
}

export const receiveSearch = (data) => {
  return {
    type: actionType.RECEIVE_SEARCH,
    data
  }
}
export const requestSearch = (data) => {
  return {
    type: actionType.REQUEST_SEARCH,
    data
  }
}

export const clearGifs = (data) => {
  return {
    type: actionType.CLEAR_GIFS,
    data
  }
}

