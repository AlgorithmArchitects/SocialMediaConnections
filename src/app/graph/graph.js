import React, { Component } from 'react';
import Person from './person';

class Graph extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {people: [
        {
         id: 1,
         name: "Cat 1",
         image: "https://placekitten.com/400/400"
        },
        {
         id: 2,
         name: "Cat 2",
         image: "https://placekitten.com/500/500"
        },
        {
         id: 3,
         name: "Cat 3",
         image: "https://placekitten.com/600/600"
        }
    ]};
  }
  render() {
    var cx = -40;
    var cy = 50;
    var people = this.state.people.map(function(person){
        cx += 90;
        return (
            <Person key={person.id} cx={cx} cy={cy} data={ person }/>
        );

    });
    return (
      <div className="graph">
        <svg width="100%" height="100%">
            {people}
        </svg>
      </div>
    );
  }
}

export default Graph;
