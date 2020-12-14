import React , {Component} from 'react';
import Button from '../../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../../axios-order';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../../../store/actions/index'
class ContactData extends Component  {
    state = { 
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig : { 
                    type: 'text',
                    placeholder : 'Your Name'
                },
                value : '',
                validation : {
                    required: true
                },
                valid: false,
                touched : false 
            },
            street : {
                elementType: 'input',
                elementConfig : { 
                    type: 'text',
                    placeholder : 'Street'
                },
                value : '',
                validation : {
                    required: true
                },
                valid: false,
                touched : false 
            },
            zipCode : {
                elementType: 'input',
                elementConfig : { 
                    type: 'text',
                    placeholder : 'Zip Code'
                },
                value : '',
                validation : {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched : false 
            },
            country : {
                elementType: 'input',
                elementConfig : { 
                    type: 'text',
                    placeholder : 'Country'
                },
                value : '',
                validation : {
                    required: true
                },
                valid: false,
                touched : false 
            },
            email : {
                elementType: 'input',
                elementConfig : { 
                    type: 'email',
                    placeholder : 'Your EMail'
                },
                value : '',
                validation : {
                    required: true
                },
                valid: false,
                touched : false 
            },
            deliveryMethod : {
                elementType: 'select',
                elementConfig : { 
                    options: [
                        {value:'fastest' , displayValue: 'Fastest'},
                        {value:'cheapest' , displayValue: 'Cheapest'},
                    ],
                },
                value : 'fastest',
                valid : true
            },
        }, 
        formIsValid : false,
        isLoading : false
    }

    inputValidation (value, rules) {
        let isValid = true; 
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid ;
    }

    inputChangeHandler = (event,id) => { 
        const updateOrderForm = { 
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updateOrderForm[id]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.inputValidation(updatedFormElement.value , updatedFormElement.validation);
        updatedFormElement.touched = true;
        updateOrderForm[id] = updatedFormElement;
        let isFormValid = true; 
        for(let key in updateOrderForm){
            isFormValid = updateOrderForm[key].valid && isFormValid;
        }
        this.setState({orderForm: updateOrderForm,formIsValid: isFormValid});
    } 

    orderHandler = (event) => { 
        event.preventDefault();
        const formData = {}; 
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = { 
            ingredients : this.props.ings,
            price : this.props.price,
            orderData : formData
        };
        this.props.onOrderBurger(order);
    }

    render () { 
        const formElementsArray = [] ; 
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key , 
                config: this.state.orderForm[key],
            })
        }
        let form = ( <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key = {formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    invalid ={!formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched = {formElement.config.touched}
                    valueType = {formElement.id}
                />
            ))}
            <Button buttonType="Success" disabled={!this.state.formIsValid}> Order </Button>
        </form>); 
        if(this.props.isLoading) { 
            form = <Spinner/>;
        }
        return ( 
            <div  className={classes.ContactData}>
                <h4>Place an Order</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isLoading : state.order.loading
    }; 
};

const mapDispatchToProps = dispatch => { 
    return{ 
        onOrderBurger : (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));