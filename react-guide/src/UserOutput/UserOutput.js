import React from 'react';
// styling
import './UserOutput.css';
const userOutput = (props) => {
    return <div className = "UserOutput">
        <p>User name : {props.userName}</p>
        <p>Length : {props.length} </p>
    </div>; 
}; 

export default userOutput;