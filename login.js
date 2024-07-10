import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from './auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const loggedIn = AuthService.login(username, password);
    this.setState({ loggedIn });
  };

  render() {
    const { username, password, loggedIn } = this.state;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Username" />
          <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
