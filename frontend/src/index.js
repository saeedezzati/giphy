// Entry Point
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

let  store = configureStore()



if(typeof window !== 'undefined') { 
  ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container')
  );
}