import React, { Component } from 'react';
import './App.css';
import CharComponent from './CharComponent/Component'
import ValidationComponenet from './ValidationComponenet/Validation'
class App extends Component {
    state = {
        userInput: ''
    } 

    inputChangeHandler = (event) => {
        this.setState({userInput : event.target.value});
    }

    DeleteCharHandler = (index) => {
        const input = [...this.state.userInput.split('')];
        input.splice(index,1);
        const updated  = input.join('');
        this.setState({userInput:updated});
    }
    render() {
        const CharList = this.state.userInput.split('').map((c,index) => {
            return <CharComponent char={c} key ={index} click={() => this.DeleteCharHandler(index)}/>
        });
        return (
        <div className="App">
            <input type="text" onChange={this.inputChangeHandler} value={this.state.userInput}/>
            <p>{this.state.userInput}</p>
            <ValidationComponenet length={this.state.userInput.length}/>
            {CharList}
        </div>
        );
    }
}

export default App;
