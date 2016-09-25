import React, { Component } from 'react';
import * as d3 from "d3";

class Graph extends Component {
  render() {
    return (
      <div className="graph">Hey</div>
    );
  }
  componentDidMount() {
      console.log("hey");
      d3.select(".graph").style("color", "blue");
  }
}

export default Graph;
