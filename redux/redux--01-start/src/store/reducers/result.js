import * as actionTypes from '../action';

const initialState ={
    results : []
}
const result_reducer  = (state = initialState ,action) => { 
    switch ( action.type ) {
        case actionTypes.STORERESULT: 
            return {
                ...state, 
                results : state.results.concat({value : action.result, id : new Date()})
            }
        case actionTypes.DELETERESULT: 
            // const newArray = [...state.results];
            // newArray.splice(id,1);
            const updatedArray = state.results.filter(result => result.id !== action.resultID)
            return {
                ...state, 
                results : updatedArray
            }
    }
    
    return state;
}

export default result_reducer ; 