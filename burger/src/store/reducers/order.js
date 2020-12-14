import * as actionsTypes from '../actions/actionsTypes'; 
import { updateObject } from '../utility'
const initialState = { 
    order : [] , 
    loading : false ,
    purchased : false
}
const reducer = (state = initialState, action) => { 
    switch ( action.type ){
        case actionsTypes.PRUCHASE_INIT : 
            return updateObject(state,{  purchased: false}) ;
        case actionsTypes.PURCHASE_BURGER_START : 
            return updateObject(state,{  loading: true}) ;           
        case actionsTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = { 
                ...action.orderData,
                id : action.orderId, 
            }
            return updateObject(state,{loading:false , 
                orders : state.order.concat(newOrder),
                purchased : true}) ;
        case actionsTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state,{loading:false }) ;
        case actionsTypes.FETCH_ORDERS_START:
            return updateObject(state,{loading:true }) ;
        case actionsTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state,{ order :action.orders,
                loading : false }) ;
        case actionsTypes.FETCH_ORDERS_FAIL:
            return updateObject(state,{ loading : false }) ;
        default : 
            return state;
    } 
}

export default reducer