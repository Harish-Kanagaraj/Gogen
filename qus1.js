import React from 'react';
import Button from './Ques1button';

class Button1 extends React.Component {
  constructor(props) {
 super(props);
 this.state = {
 count: 0
 };
 }

handleClick = () => {
this.setState({ count: this.state.count + 1 });
};

render() {
 return (
 <div>
 <p>Count: {this.state.count}</p>
 <Button text="Click me" onClick={this.handleClick} />
 </div>
  );
 }
}

export default Button1;
