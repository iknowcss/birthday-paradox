import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import BirthdayList from './BirthdayList';

class PresenterFlow extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/presenter" component={() => <div>
          <div>{this.props.birthdays.length} birthdays collected</div>
          <Link to="/presenter/graph">Start!</Link>
        </div>}/>

        <Route exact path="/presenter/graph" component={() => (
          <BirthdayList birthdays={this.props.birthdays}/>
        )}/>

        <Redirect to="/presenter"/>
      </Switch>
    );
  }
}

export default PresenterFlow;
