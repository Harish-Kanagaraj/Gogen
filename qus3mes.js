import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
 toggleLogin = () => {
this.setState(prevState => ({
isLoggedIn: !prevState.isLoggedIn
}));
};
 render() {
    const { isLoggedIn } = this.state;
return (
<div>
<button onClick={this.toggleLogin}>
 {isLoggedIn ? 'Log Out' : 'Log In'}
 </button>
 <div>
 {isLoggedIn ? (
 <p>Welcome! You are logged in.</p>
  ) : (
 <p>Please log in to continue.</p>
  )}
</div>
 </div>
  );
 }
}

export default Message;
