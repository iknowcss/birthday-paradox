import React, { Component } from 'react';

export default class Drumroll extends Component {
  componentDidMount() {
    document.getElementById('drumroll').play();
  }

  render() {
    return <div style={{width: '100%'}}>
      <img style={{width: '100%'}} src="http://birthday.iknowcss.com/media/drumroll.gif"/>
    </div>
  }
}