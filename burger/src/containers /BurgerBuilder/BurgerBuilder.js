import React , {Component} from 'react'; 
import Aux from '../../hoc/Aux'; 
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary  from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component 
{ 
    state = { 
        totalPrice : 4,
        isPurhasing : false ,
        isLoading : false,
        error : false 
    }

    componentDidMount () { 
        // axios.get('/ingredients.json')
        // .then(response => { 
        //     this.setState({ingredients : response.data})
        // })
        // .catch(err => { 
        //     this.setState({error : true})
        // })
    }

    // addIngredientHandler = (type) => { 
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1 ;
    //     const updatedIngredients  = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const price = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice; 
    //     const newPrice = oldPrice + price; 
    //     this.setState({totalPrice : newPrice,ingredients : updatedIngredients});
    //     this.UpdateIsPurchase(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => { 
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0 ){ 
    //         return ;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients  = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const price = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice; 
    //     const newPrice = oldPrice - price; 
    //     this.setState({totalPrice : newPrice,ingredients : updatedIngredients});
    //     this.UpdateIsPurchase(updatedIngredients);
    // }
    
    UpdateIsPurchase(updatedIngredients){ 
        const ingredients = updatedIngredients; 
        const sum = Object.keys(ingredients)
        .map(key => { 
            return ingredients[key];
        })
        .reduce((sum,el) => {
            return sum+el;
        },0);
        return sum > 0 ;

    }

    purchaseHandler = () =>  { 
        this.setState({isPurhasing: true});
    }

    closePurchaseHandler = () => {
        this.setState({isPurhasing: false});
    }

    purchaseContinueHandler = () => { 
        this.props.history.push('checkout');
    }

    render() { 
        const disabledInfo = { 
            ...this.props.ings
        };
        for(let key in disabledInfo){ 
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        let orderSummary = null; 
        let burger = this.state.error ? <p> ERROR </p> : <Spinner/>;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addIngredientButton={this.props.onAddIngredients} 
                        removeIngredientButton={this.props.onDeleteIngredients}
                        disabled={disabledInfo}
                        price = {this.props.price}
                        isPurchasable = {this.UpdateIsPurchase(this.props.ings)}
                        purchased ={this.purchaseHandler}
                        />
                </Aux>
            );

            orderSummary = <OrderSummary 
                        price = {this.props.price}
                        ingredients={this.props.ings} 
                        purchaseContinue = {this.purchaseContinueHandler}
                        pruchaseCancelled = {this.closePurchaseHandler}
                    ></OrderSummary>
        }

        if(this.state.isLoading){
            orderSummary = <Spinner/>
        }
       
        return (
            <Aux>
                <Modal show={this.state.isPurhasing} modalClosed={this.closePurchaseHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        ) ; 
    }
}


const mapStateToProps = state => {
    return { 
        ings : state.ingredients,
        price : state.totalPrice
    }; 
};

const mapDispatchProps = dispatch => { 
    return { 
        onAddIngredients : (name) => dispatch({type: actionTypes.ADD_INGREDIENT,ingredientsName :name}),
        onDeleteIngredients : (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientsName :name}),
    }
}

export default connect(mapStateToProps,mapDispatchProps)(ErrorHandler(BurgerBuilder,axios)); 