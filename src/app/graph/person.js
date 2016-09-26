import React, { Component } from 'react';

class Person extends Component {

  guidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  render() {
    var patternId = this.guidGenerator();
    var patternIdUrl = "url(#" + patternId + ")";
    return (
        <g className='person'>
            <defs>
              <pattern id={ patternId } x="0%" y="0%" height="100%" width="100%" viewBox="0 0 400 400">
                <image x="0%" y="0%" width="400" height="400" xlinkHref={this.props.data.image}></image>
              </pattern>
            </defs>
            <g>
                <title>{this.props.data.name}</title>
                <circle cx={ this.props.cx } cy={ this.props.cy } r="40" fill={ patternIdUrl } />
            </g>
        </g>
    );
  }
}

export default Person;
