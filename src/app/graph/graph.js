import React, { Component } from 'react';
import Person from './person';
import './graph.css';

class Graph extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {twitterPeople: []};
  }
  componentDidMount(){
    fetch('/twitter?screen_name=carterthayer')
        .then(response => response.json())
        .then(data => this.setState({ twitterPeople: data }))
        .catch(err => console.error(err));
  }
  render() {
    var twitterPeople = this.state.twitterPeople.map(function(person){
        return (
            <Person key={person.id} data={ person } alignImage="right"/>
        );
    });
    return (
      <div className="graph">
        <div className="twitter">
            {twitterPeople}
        </div>
        <div className="facebook">
            hey
        </div>
      </div>
    );
  }
}

export default Graph;
