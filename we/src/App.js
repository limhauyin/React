import React, {Component} from 'react'; 
import {Link, Route} from 'react-router-dom';
import Users from './containers/Users'
import asyncComponent from './hoc/asyncComponent';

const AsyncPizza = asyncComponent(()=> {
    return import('./containers/Pizza')
})
class App extends Component { 
    render () {
        return ( 
            <div>
                <div>
                    <Link to="/">Users</Link> | 
                    <Link to="/pizza">Pizza</Link> 
                </div>
                <div>
                    <Link to="/" exact component={Users}>Users</Link> | 
                    <Link to="/pizza" component={AsyncPizza}>Pizza</Link> 
                </div>
            </div>
        )
    }
}

export default App