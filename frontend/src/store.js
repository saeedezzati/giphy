import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/reducers';
import thunk from 'redux-thunk';

const middleware = [ thunk ]

var composeEnhancers = compose;


if(typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const reducer = rootReducer

function configureStore () {
  let store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(
        ...middleware
      ),
    )
  );
  return store   
}
export default configureStore;
