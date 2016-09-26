import React, { Component } from 'react';
import Person from './person';

class Graph extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {people: []};
    for(var res = 50; res < 100; res++){
        this.state.people.push({id: res, name: "Cat " + res, image: "https://placekitten.com/"+res+"/"+res});
    }
  }
  render() {
    var count = 0;
    var cx = -40;
    var cy = 0;
    var people = this.state.people.map(function(person){
        if(count%10 === 0){
            cx = -40;
            cy += 60;
        }
        count++;
        cx += 90;
        return (
            <Person key={person.id} cx={cx} cy={cy} data={ person }/>
        );

    });
    return (
      <div className="graph">
        <svg width="100%" height="600px">
            {people}
        </svg>
      </div>
    );
  }
}

export default Graph;
