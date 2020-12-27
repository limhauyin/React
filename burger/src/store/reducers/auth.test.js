import reducer  from './auth';
import * as actionsTypes from '../actions/actionsTypes';

describe ('auth reducer' , () => { 
    it('should return the initial State' , ()=> { 
        expect(reducer(undefined, {})).toEqual({
            token : null ,
            userId : null, 
            error : null, 
            loading: false ,
            authRedirectPath : '/'
        });
    })

    it('should store token upon login' , ()=> { 
        expect(reducer({
            token : null ,
            userId : null, 
            error : null, 
            loading: false ,
            authRedirectPath : '/'
        }, {
            type : actionsTypes.AUTH_SUCCESS, 
            idToken :'test', 
            userId : 'test'
        })).toEqual({
            token : 'test' ,
            userId : 'test', 
            error : null, 
            loading: false ,
            authRedirectPath : '/'
        });
    })
})