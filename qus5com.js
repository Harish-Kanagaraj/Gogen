// withLogger.js

import React, { Component } from 'react';

const withLogger = WrappedComponent => {
  return class extends Component {
    componentDidMount() {
      console.log(`Component ${WrappedComponent.name} mounted`);
    }

    componentDidUpdate(prevProps, prevState) {
      console.log(`Component ${WrappedComponent.name} updated`);
    }

    componentWillUnmount() {
      console.log(`Component ${WrappedComponent.name} will unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLogger;
