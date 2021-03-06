import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'; 
import {createStore,applyMiddleware,compose,combineReducers} from 'redux' ;
import { Provider } from 'react-redux';
import burgerBuilderReducer  from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/reducers/order' ;
import authReducer from './store/reducers/auth';
import createSageMiddleware from 'redux-saga'; 
import { watchAuth , watchBurgerBuilder, watchOrderBuilder} from './store/sagas/index';

const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose ;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order  : orderReducer,
    auth    : authReducer
})

const sagaMiddleware = createSageMiddleware(); 

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk,sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrderBuilder);
const app  = (
    <Provider store={store}>
        <BrowserRouter> 
            <App/>
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
