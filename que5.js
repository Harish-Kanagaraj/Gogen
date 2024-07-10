import React, { Component } from 'react';
import ExampleComponent from './qus5com';

class Composition extends Component {
  render() {
    return (
      <div>
        <h1>Higher-Order Component </h1>
        <ExampleComponent />
      </div>
    );
  }
}

export default Composition;
