import * as actionTypes from './actionsTypes'; 
import axios from '../../axios-order';

export const addIngredient = (name) =>  { 
    return { 
        type : actionTypes.ADD_INGREDIENT,
        ingredientsName : name
    }; 
}

export const removeIngredient = (name) =>  { 
    return { 
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientsName : name
    }; 
}

export const setIngredients = (ingredients) => { 
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}
export const setIngredientsFailed = () => { 
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}
export const initIngredient = () => {
    return dispatch => { 
        axios.get('/ingredients.json')
        .then(response => { 
           dispatch(setIngredients(response.data));
        })
        .catch(err => { 
            
        })
    }
}
