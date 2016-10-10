import React, { Component } from 'react';
import './person.css';

class Person extends Component {

  render() {
    var patternIdUrl = "url(#" + this.props.data.id + ")";
    return (
        <div>
            {this.props.alignImage == "right" ? this.props.data.name : null}
            <img src={ this.props.data.profile_image_url } className='circle' />
            {this.props.alignImage == "left" ? this.props.data.name : null}
        </div>
    );
  }
}

export default Person;
