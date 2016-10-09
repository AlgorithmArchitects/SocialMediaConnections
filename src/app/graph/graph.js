import React, { Component } from 'react';
import Person from './person';

class Graph extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {people: []};
  }
  componentDidMount(){
    fetch('/twitter?screen_name=carterthayer')
        .then(response => response.json())
        .then(data => this.setState({ people: data }))
        .catch(err => console.error(err));
  }
  render() {
    var people = this.state.people.map(function(person){
        return (
            <Person key={person.id}data={ person }/>
        );
    });
    return (
      <div className="graph">
        {people}
      </div>
    );
  }
}

export default Graph;
