import React, { Component } from 'react';
import Person from './person';
import './graph.css';

class Graph extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {twitterPeople: [], twitter_screen_name: null};
    this.changeTwitterScreenName = this.changeTwitterScreenName.bind(this);
    this.submitTwitter = this.submitTwitter.bind(this);
  }
  changeTwitterScreenName(e){
    this.state.twitter_screen_name = e.target.value;
  }
  submitTwitter(e){
    e.preventDefault();
    fetch('/twitter?screen_name=' + this.state.twitter_screen_name)
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
            <form onSubmit={this.submitTwitter}>
                <input name="twitter_screen_name" ref="twitter_screen_name" onChange={this.changeTwitterScreenName}/>
                <input type="submit" value="Submit" />
            </form>
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
