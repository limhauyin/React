import React , {Component} from 'react';
import Person from './Person/Person';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

// const persons = (props) => {
//     console.log('persons js rendering');
//     return props.persons.map((person, index) => {
//         return <ErrorBoundary key={person.id}><Person
//           click={() => props.clicked(index)}
//           name={person.name} 
//           age={person.age}
//           changed={(event) => props.changed(event, person.id)} />
//           </ErrorBoundary>
//     });
// }

class Persons extends Component { 
    // static getDerivedStateFromProps(props,state){
    //     console.log('Persons js getDerivedState');
    //     return state;
    // }
    shouldComponentUpdate(nextProps,nextState){
        console.log('Persons js shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(previousProps, prevState){
        console.log('Person js getSnapshotBeforeUpdate');
        return true;
    }

    componentDidUpdate() { 
        console.log('Person js componentDidUpdate');
    }
    render() {
        console.log('Rendering');
        return (
            this.props.persons.map((person, index) => {
                return <ErrorBoundary key={person.id}><Person
                    click={() => this.props.clicked(index)}
                    name={person.name} 
                    age={person.age}
                    changed={(event) => this.props.changed(event, person.id)} />
                    </ErrorBoundary>
            })
        )
    }
}
    

export default Persons;
