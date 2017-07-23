import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PresenterPage extends Component {
  render() {
     return (
       <div>
         Presenter page
       </div>
     );
  }
}

export { PresenterPage as Pure };

export default connect(state => ({}))(PresenterPage);
