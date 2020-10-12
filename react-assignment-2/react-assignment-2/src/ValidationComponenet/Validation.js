import React from 'react';

const Validation = (props) => {
    let validationMessage = 'Text Too Short';
    if(props.length >= 5){
        validationMessage = 'Text Too Long'
    }
    return <div>
       {validationMessage}
    </div> 
}; 

export default Validation;