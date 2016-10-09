import React, { Component } from 'react';
import './person.css';

class Person extends Component {

  render() {
    var patternIdUrl = "url(#" + this.props.data.id + ")";
    return (
        <div>
            <img src={ this.props.data.profile_image_url } className='circle' />
            {this.props.data.name}
        </div>
    );
  }
}

export default Person;
