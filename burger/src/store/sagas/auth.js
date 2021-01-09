import {put, delay,call} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';
export function* logoutSaga(action) { 
    // yield same as promise (wait until function done then continue);
    yield call ([localStorage,'removeItem'],"token");
    yield call ([localStorage,'removeItem'],"expirationTime");
    yield call ([localStorage,'removeItem'],"userId"); // call function can use for test
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationTime');
    // yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) { 
    yield delay(action.expirationTime * 1000); 
    yield put(actions.logout());
}


export function* AuthUserSaga(action) { 
    yield put ( actions.authStart()); 
    const authData = { 
        email :action.email ,
        password : action.password ,
        returnSecureToken : true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDEncIujsCMwr-yPEud0GCKvQbuHb3Ewo';
    if(!action.isSignUp){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDEncIujsCMwr-yPEud0GCKvQbuHb3Ewo';
    }
    try { 
        const response = yield axios.post(url,authData);

        // when add yield axios will not return promise , will auto wait for the request finish and straight get the response
        const expirationDate = yield new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        yield localStorage.setItem('token',response.data.idToken);
        yield localStorage.setItem('expirationTime',expirationDate);
        yield localStorage.setItem('userId',response.data.localId);
        yield put (actions.authSuccess(response.data.idToken, response.data.localId));
        yield put (actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) { 
        yield put (actions.authFail(error.response.data.error));
    }
}


export function* authCheckStateSaga(action) { 
    const token = yield localStorage.getItem('token');
   
    if(!token){
        yield put(actions.logout()); 
    } else { 
        const expirationTime = yield new Date(localStorage.getItem('expirationTime')); 
        if(expirationTime <= new Date()){
            yield put (actions.logout());
        } else { 
            const userId = yield localStorage.getItem('userId');
            yield put (actions.authSuccess(token,userId));
            yield put (actions.checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/ 1000));
        }
    }
    
}
