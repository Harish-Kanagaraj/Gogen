import React, { Component } from 'react';
import ErrorBoundary from './qus11bound';
import ChildComponent from './qus11bound';

class Bound extends Component {
  render() {
    return (
      <div>
        <h1>Error Boundary Example</h1>
        <ErrorBoundary>
          <ChildComponent />
        </ErrorBoundary>
      </div>
    );
  }
}

export default Bound;
