import React, { Component } from 'react';
import autobind from 'react-autobind';

class AppRoot extends Component {
  constructor () {
    super();
    autobind(this, 'handleClick');
  }

  handleClick() {
    alert('hi')
  }

  render() {
    return (
      <section>
        <div>Click the button</div>
        <div>
          <button
            onClick={this.handleClick}
          >Button</button>
        </div>
      </section>
    );
  }
}

export default AppRoot;
