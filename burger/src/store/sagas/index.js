import { takeEvery,all } from 'redux-saga/effects';
import * as actionsTypes  from '../actions/actionsTypes';
import { logoutSaga, checkAuthTimeoutSaga ,AuthUserSaga , authCheckStateSaga} from './auth'; 
import { initIngredientSaga} from './burgerBuilder'; 
import { purchaseBurgerSaga, fetchOrdersSaga} from './order'; 

export function* watchAuth() { 
    // diff kind of writing , all will run concurrently
    yield all ([
         takeEvery(actionsTypes.AUTH_INITIATE_LOGOUT,logoutSaga),
         takeEvery(actionsTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga),
         takeEvery(actionsTypes.AUTH_USER,AuthUserSaga),
         takeEvery(actionsTypes.AUTH_CHECK_STATE,authCheckStateSaga),
    ]);
    // yield takeEvery(actionsTypes.AUTH_INITIATE_LOGOUT,logoutSaga);
    // yield takeEvery(actionsTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga);
    // yield takeEvery(actionsTypes.AUTH_USER,AuthUserSaga);
    // yield takeEvery(actionsTypes.AUTH_CHECK_STATE,authCheckStateSaga);
}

export function* watchBurgerBuilder() { 
    yield takeEvery(actionsTypes.INIT_INGREDIENTS,initIngredientSaga);
}

export function* watchOrderBuilder() { 
    yield takeEvery(actionsTypes.PURCHASE_BURGER,purchaseBurgerSaga);
    yield takeEvery(actionsTypes.FETCH_ORDERS,fetchOrdersSaga);
}
