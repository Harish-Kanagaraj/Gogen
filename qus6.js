import React from 'react';
import DataFetcher from './qus6lifecycle';

class Lifecycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1
    };
  }

  changeUserId = () => {
    this.setState({ userId: 2 });
  };

  render() {
    return (
      <div>
        <h1>Data Fetching </h1>
        <button onClick={this.changeUserId}>Change User ID</button>
        <DataFetcher userId={this.state.userId} />
      </div>
    );
  }
}

export default Lifecycle;
