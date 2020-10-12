import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    username : "Change Name 1",
    showPerson : false
  }
  // on change
  inputChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  // toogle person handler 
  togglePersonHandler = () => {
    const isShow = this.state.showPerson;
    this.setState({showPerson: !isShow});
  }
  render() {
    
    let persons = null ; 
    if(this.state.showPerson){
        persons = (<div>
           <UserOutput userName ={this.state.username} length = {this.state.username.length}/>
           <UserOutput userName ="Name 3"/>
        </div> );
    }
    return (
      <div className="App">
        <button onClick = {this.togglePersonHandler} >Change name</button>
        <UserInput changed={this.inputChangeHandler} currentName={this.state.username}/>
       {persons}
      </div>
    );
  }
}

export default App;
