import * as actionTypes from '../actions/actionsTypes'; 
import {updateObject} from '../utility'
const initialState = { 
    ingredients :null,
    totalPrice : 4,
    error: false
}

const INGREDIENT_PRICES = { 
    salad : 0.5 ,
    cheese : 0.4 , 
    bacon : 1, 
    meat : 1 
}; 

const addIngredient = (state,action)=> { 
    const updatedIngredient  = {[action.ingredientsName]: state.ingredients[action.ingredientsName]+ 1}
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
    const updatedState       = {
        ingredients : updatedIngredients,
        totalPrice :state.totalPrice  + INGREDIENT_PRICES[action.ingredientsName]
    }
    return updateObject(state,updatedState);
}

const setIngredients = (state,action) => {
    return updateObject(state,{ 
        ingredients : {
            salad : action.ingredients.salad, 
            bacon : action.ingredients.bacon, 
            cheese : action.ingredients.cheese, 
            meat : action.ingredients.meat, 
        },
        totalPrice : 4,
        error: false
    } )
}


const removeIngredient = (state , action) => { 
    const updatedIng  = {[action.ingredientsName]: state.ingredients[action.ingredientsName]- 1}
    const updatedIngs = updateObject(state.ingredients,updatedIng)
    const updatedSt       = {
        ingredients : updatedIngs,
        totalPrice :state.totalPrice  - INGREDIENT_PRICES[action.ingredientsName]
    }
    return updateObject(state,updatedSt);
}

const reducer = (state = initialState , action ) => { 
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: 
            return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS: 
            return setIngredients(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state,{ 
                error: true
            } )
        default : 
            return state;
    }

    
}
export default reducer ; 