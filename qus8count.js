// Counter.js

import React, { Component } from 'react';

class Counter extends Component {
  render() {
    const { count, onIncrement, onDecrement } = this.props;

    return (
      <div>
        <h2>Counter</h2>
        <p>Count: {count}</p>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
      </div>
    );
  }
}

export default Counter;
