import React from 'react';

class DataFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => this.setState({ data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    // Example: Fetch new data when props change
    if (prevProps.userId !== this.props.userId) {
      this.setState({ loading: true });
      fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.userId}`)
        .then(response => response.json())
        .then(data => this.setState({ data, loading: false }))
        .catch(error => this.setState({ error, loading: false }));
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    return (
      <div>
        <h2>Data Fetcher</h2>
        <p>User ID: {this.props.userId}</p>
        <p>Title: {data && data.title}</p>
      </div>
    );
  }
}

export default DataFetcher;

