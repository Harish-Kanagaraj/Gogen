
import React, { Component } from 'react';
import Counter from './qus8count';

class Lift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        <h1>State Lift-Up </h1>
        <Counter
          count={count}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
      </div>
    );
  }
}

export default Lift;
