import React, { Component } from 'react';
import { connect } from 'react-redux';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/action';

class Persons extends Component {
    state = {
        persons: []
    }
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddPersons} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDeletePersons(person.id)}/>
                ))}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return { 
        persons : state.persons,
    }; 
};

const mapDispatchProps = dispatch => { 
    return { 
        onAddPersons : (name,age) => dispatch({type: actionTypes.ADDPERSON,personData : {name: name , age : age}}),
        onDeletePersons : (id) => dispatch({type: actionTypes.REMOVEPERSON,personId :id}),
    }
}

export default connect(mapStateToProps,mapDispatchProps)(Persons);