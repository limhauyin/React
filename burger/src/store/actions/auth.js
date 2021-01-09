import * as actionTypes from './actionsTypes';

export const authStart = () => { 
    return { 
        type : actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId) => { 
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    }
}


export const authFail = (error) => { 
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}
export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationTime');
    // localStorage.removeItem('userId');
    return {
        type : actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => { 
    // return dispatch =>{ 
    //     setTimeout(() =>{
    //         dispatch(logout());
    //     } ,expirationTime*1000)
    // }
    return { 
        type : actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime : expirationTime
    }
}


export const auth = (email , password,isSignUp) => { 
    // return dispatch => {
    //    dispatch(authStart()); 
    //    const authData = { 
    //         email :email ,
    //         password : password ,
    //         returnSecureToken : true
    //    }
    //    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDEncIujsCMwr-yPEud0GCKvQbuHb3Ewo';
    //    if(!isSignUp){
    //        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDEncIujsCMwr-yPEud0GCKvQbuHb3Ewo';
    //    }
    //    axios.post(url,authData)
    //    .then(response => { 
    //        const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
    //        localStorage.setItem('token',response.data.idToken);
    //        localStorage.setItem('expirationTime',expirationDate);
    //        localStorage.setItem('userId',response.data.localId);
    //        dispatch(authSuccess(response.data.idToken, response.data.localId));
    //        dispatch(checkAuthTimeout(response.data.expiresIn));
    //    }) 
    //    .catch (err=> {
    //        dispatch(authFail(err.response.data.error));
    //    })
    // }
    return { 
        type: actionTypes.AUTH_USER,
        email : email,
        password:password, 
        isSignUp : isSignUp
    }
}

export const setAuthRedirectPath = (path) => { 
    return { 
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}
// auto login to prevent refresh page and logout 
export const authCheckState = () => { 
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if(!token){
    //         dispatch(logout()); 
    //     } else { 
    //         const expirationTime = new Date(localStorage.getItem('expirationTime')); 
    //         if(expirationTime <= new Date()){
    //             dispatch(logout());
    //         } else { 
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token,userId));
    //             dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/ 1000));
    //         }
    //     }
    // }
    return { 
        type : actionTypes.AUTH_CHECK_STATE
    }
}