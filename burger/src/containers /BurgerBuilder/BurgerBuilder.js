import React , {Component} from 'react'; 
import Aux from '../../hoc/Aux'; 
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary  from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
 
const INGREDIENT_PRICES = { 
    salad : 0.5 ,
    cheese : 0.4 , 
    bacon : 1, 
    meat : 1 
}; 

class BurgerBuilder extends Component 
{ 
    state = { 
        ingredients : null,
        totalPrice : 4,
        isPurchasable : false ,
        isPurhasing : false ,
        isLoading : false,
        error : false 
    }

    componentDidMount () { 
        axios.get('/ingredients.json')
        .then(response => { 
            this.setState({ingredients : response.data})
        })
        .catch(err => { 
            this.setState({error : true})
        })
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
        this.setState({isLoading :  true});
        const order = { 
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer: { 
                name: 'Test', 
                address : { 
                    street : 'test', 
                    zipCode : 81100, 
                    country : 'test'
                }, 
                email : 'test@test.com'
            }
        };
        axios.post('/orders.json',order)
        .then(response =>  {
            this.setState({
                isLoading :  false,
                isPurhasing : false
            });
        }).catch(err => {
            this.setState({
                isLoading :  false,
                isPurhasing : false
            });
        })
    }

    render() { 
        const disabledInfo = { 
            ...this.state.ingredients
        };
        for(let key in disabledInfo){ 
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        let orderSummary = null; 
        let burger = this.state.error ? <p> ERROR </p> : <Spinner/>;
        if(this.state.ingredients){
            burger = (
                <Aux>
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
            );

            orderSummary = <OrderSummary 
                        price = {this.state.totalPrice}
                        ingredients={this.state.ingredients} 
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

export default ErrorHandler(BurgerBuilder,axios); 