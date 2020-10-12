import React from 'react';

const userInput = (props) => {
    // styling
    const style = {
        border : '2px solid red',
    }
    // 2 way binding 
    return <input type="text" style={style} onChange={props.changed} value={props.currentName}/>; 
}; 

export default userInput;