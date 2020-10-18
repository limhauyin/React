import React, {Component} from 'react';


class ErrorBoundary extends Component {
    state = {
        hasError : false,
        errorMsg : '',
    } 

    componentDidCatch = (error, info) => { 
        this.setState({hasError : true, errorMsg : error});
    }
    render () { 
        if(this.state.hasError){
            return <h1>Something went Wrong</h1>
        } else { 
           return this.props.children;
        }
    }

}

export default ErrorBoundary;