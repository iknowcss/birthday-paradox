import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import CandleGraph from './CandleGraph';

class Slide1 extends Component {
  constructor() {
    super();

    this.state = { page: 0 };
  }

  handleNextClick() {
    this.setState({ page: this.state.page + 1 });
  }

  render() {
    return (
      <div>
        <CandleGraph
          active={this.state.page >= 1}
          peopleCount={this.state.page >= 2 ? this.props.birthdays.length : 0}
        />
        <button onClick={() => this.handleNextClick()}>Next</button>
      </div>
    );
  }
}

class PresenterFlow extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/presenter" component={() => <div>
          <div>{this.props.birthdays.length} birthdays collected</div>
          <Link to="/presenter/graph">Start!</Link>
        </div>}/>

        <Route path="/presenter/graph" component={() => (
          <Slide1 birthdays={this.props.birthdays} />
        )} />

        <Redirect to="/presenter"/>
      </Switch>
    );
  }
}

export default PresenterFlow;
