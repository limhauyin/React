import React , {Component} from 'react';
import Button from '../../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../../axios-order';
import Spinner from '../../../../components/UI/Spinner/Spinner';

class ContactData extends Component  {
    state = { 
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        isLoading : false
    }

    OrderHandler = (event) => { 
        event.preventDefault();

        this.setState({isLoading :  true});
        const order = { 
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
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
            });
            this.props.history.push('/');
        }).catch(err => {
            this.setState({
                isLoading :  false,
            });
        })

    }
    render () { 
        let form = ( <form>
            <input className={classes.Input} type='text' name="name" placeholder="Your Name"></input>
            <input className={classes.Input} type='email' name="email" placeholder="Your Email"></input>
            <input className={classes.Input} type='text' name="street" placeholder="Street"></input>
            <input className={classes.Input} type='text' name="postalCode" placeholder="Postal Code"></input>
            <Button buttonType="Success" clicked={this.OrderHandler}> Order </Button>
        </form>); 
        if(this.state.isLoading) { 
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
export default ContactData;