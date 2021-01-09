import * as actionTypes from './actionsTypes';
export const purchaseBurgerSuccess = (id,orderData) => { 
    return { 
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id , 
        orderData : orderData
    }
}

export const purchaseBurgerFail = (error) => { 
    return { 
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
}
export const purchaseBurgerStart = () => { 
    return { 
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) => { 
    // return dispatch => {
    //     dispatch(purchaseBurgerStart());
    //     axios.post('/orders.json?auth='+ token,orderData)
    //     .then(response =>  {
    //        dispatch(purchaseBurgerSuccess(response.data.name,orderData));
    //     }).catch(err => {
    //         dispatch(purchaseBurgerFail(err));
    //     })
    // }
    return { 
        type : actionTypes.PURCHASE_BURGER,
        orderData : orderData, 
        token : token
    }
}
export const purchaseInit = () => { 
    return { 
        type : actionTypes.PRUCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => { 
    return { 
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFail = (err) => { 
    return { 
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : err
    }
}

export const fetchOrderStart = () => { 
    return { 
        type : actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token,userId) => {
    // return dispatch => { 
    //     dispatch(fetchOrderStart());
    //     const queryParams = '?auth='+ token + '&orderBy="userId"&equalTo="' +userId + '"';
    //     axios.get('/orders.json' + queryParams )
    //     .then(res => { 
    //         const fetchOrders = [] ;
    //         for(let key in res.data) { 
    //             fetchOrders.push({
    //                 ...res.data[key],
    //                 id: key
    //             });
    //         }
    //         dispatch(fetchOrderSuccess(fetchOrders));
    
    //     }).catch(err => { 
    //         dispatch(fetchOrderFail(err));
    //     })
    // }

    return {
        type : actionTypes.FETCH_ORDERS,
        token : token , 
        userId : userId
    }
   
}