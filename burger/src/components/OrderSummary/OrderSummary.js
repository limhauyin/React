import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button';


class  orderSummary extends Component {
    render() { 
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(key => {
            return (<li key={key}>
                <span style={{textTransform:'capitalize'}}>{key}</span> : {this.props.ingredients[key]} 
                </li>);
        })
        return (
            <Aux> 
                <h3> Your Order </h3>
                <p> Ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.price} </strong></p>
                <p>Continue to Check Out </p>
                <Button buttonType="Success" clicked={this.props.purchaseContinue}> Continue </Button>
                <Button buttonType="Danger"  clicked={this.props.pruchaseCancelled}> Cancel </Button>
            </Aux>
        )
    }
} 

export default orderSummary; 