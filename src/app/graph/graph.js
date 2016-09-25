import React, { Component } from 'react';

class Graph extends Component {
  render() {
    return (
      <div className="graph">
        <svg width="100%" height="600px">
            <defs>
              <pattern id="image" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 400 400">
                <image x="0%" y="0%" width="400" height="400" xlinkHref="https://placekitten.com/400/400"></image>
              </pattern>
            </defs>

            <circle id="sd" cx="50" cy="50" r="25" fill="url(#image)"/>
        </svg>
      </div>
    );
  }
  componentDidMount() {
  }
}

export default Graph;
