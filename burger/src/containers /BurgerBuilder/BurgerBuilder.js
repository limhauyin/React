import React , {Component} from 'react'; 
import Aux from '../../hoc/Aux'; 
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary  from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = { 
    salad : 0.5 ,
    cheese : 0.4 , 
    bacon : 1, 
    meat : 1 
}; 



class BurgerBuilder extends Component 
{ 
    state = { 
        ingredients : { 
            salad : 0, 
            bacon : 0, 
            cheese : 0, 
            meat : 0, 
        },
        totalPrice : 4,
        isPurchasable : false ,
        isPurhasing : false ,
    }

    addIngredientHandler = (type) => { 
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1 ;
        const updatedIngredients  = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const price = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice; 
        const newPrice = oldPrice + price; 
        this.setState({totalPrice : newPrice,ingredients : updatedIngredients});
        this.UpdateIsPurchase(updatedIngredients);
    }

    removeIngredientHandler = (type) => { 
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0 ){ 
            return ;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients  = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const price = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice; 
        const newPrice = oldPrice - price; 
        this.setState({totalPrice : newPrice,ingredients : updatedIngredients});
        this.UpdateIsPurchase(updatedIngredients);
    }
    UpdateIsPurchase(updatedIngredients){ 
        const ingredients = updatedIngredients; 
        const sum = Object.keys(ingredients)
        .map(key => { 
            return ingredients[key];
        })
        .reduce((sum,el) => {
            return sum+el;
        },0);
        this.setState({isPurchasable : sum > 0});

    }

    purchaseHandler = () =>  { 
        this.setState({isPurhasing: true});
    }

    closePurchaseHandler = () => {
        this.setState({isPurhasing: false});
    }

    purchaseContinueHandler = () => { 
        alert('continue');
    }

    render() { 
        const disabledInfo = { 
            ...this.state.ingredients
        };
        for(let key in disabledInfo){ 
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        return (
            <Aux>
                <Modal show={this.state.isPurhasing} modalClosed={this.closePurchaseHandler}> 
                    <OrderSummary 
                        price = {this.state.totalPrice}
                        ingredients={this.state.ingredients} 
                        purchaseContinue = {this.purchaseContinueHandler}
                        pruchaseCancelled = {this.closePurchaseHandler}
                    ></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredientButton={this.addIngredientHandler} 
                    removeIngredientButton={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price = {this.state.totalPrice}
                    isPurchasable = {this.state.isPurchasable}
                    purchased ={this.purchaseHandler}
                    />
            </Aux>
        ) ; 
    }
}

export default BurgerBuilder; 