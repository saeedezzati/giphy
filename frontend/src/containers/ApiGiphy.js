import axios from 'axios';
import _ from 'lodash';
import { setAppState, clearAppState, requestTrendings, receiveTrendings, clearTrendings } from '../actions/actions'
import cookies from 'react-cookies';

import { URL, TRENDING, SEARCH } from '../config/Api';



export function errorHandler(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}

export const ApiGiphy = {
    getTrendings: (limit, offset, dispatch) => {
        var config = {
            headers: {
                // 'Access-Control-Allow-Headers': '*',
                // 'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                'api_key':'lQC44oTRSnNSOzuGZu0Cjit9mcgcllZt',
                'limit': limit,
                'offset': offset,
                'rating': 'g',
                'fmt': 'json',
            }
        }
        dispatch(requestTrendings());
        return axios
            .get(URL + TRENDING , config)
            .then(function (response) {
                dispatch(receiveTrendings(response.data));
            })
            .catch(function (error) { 
                errorHandler(error)
            });
    },
    search: (searchValue, limit, offset, dispatch) => {
        var config = {
            headers: {
                // 'Access-Control-Allow-Headers': '*',
                // 'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                'api_key':'lQC44oTRSnNSOzuGZu0Cjit9mcgcllZt',
                'q': searchValue,
                'limit': limit,
                'offset': offset,
                'rating': 'g',
                'lang': 'en',
                'fmt': 'json',
            }
        }
        dispatch(requestTrendings());
        return axios
            .get(URL + SEARCH , config)
            .then(function (response) {
                dispatch(receiveTrendings(response.data));
            })
            .catch(function (error) { 
                errorHandler(error)
            });
    },
    
    
}

