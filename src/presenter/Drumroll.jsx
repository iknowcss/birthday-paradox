import React, { Component } from 'react';

export default class Drumroll extends Component {
  componentDidMount() {
    document.getElementById('thecurrentsound').play();
  }

  render() {
    return <div style={{width: '100%'}}>
      <img style={{width: '100%'}} src="http://www.cutecatgifs.com/wp-content/uploads/2014/01/metal.gif"/>
    </div>
  }
}