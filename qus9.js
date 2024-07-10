
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './qus9action';

class Context extends Component {
  render() {
    const { count, increment, decrement } = this.props;

    return (
      <div>
        <h1>Redux Integration Example</h1>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count
});

const mapDispatchToProps = {
  increment,
  decrement
};

export default connect(mapStateToProps, mapDispatchToProps)(Context);
