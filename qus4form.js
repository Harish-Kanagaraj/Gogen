import React, { Component } from 'react';

class Form extends Component {
constructor(props) {
super(props);
this.state = {
  name: '',
  age: '',
  email: '',
  isSubmitted: false
    };
}

handleChange = (event) => {
 const { name, value } = event.target;
this.setState({
 [name]: value
  });
};

handleSubmit = (event) => {
 event.preventDefault();
 const { name, age, email } = this.state;
 if (name && age && email) {
  this.setState({
   isSubmitted: true
   });
console.log('Form submitted with:', { name, age, email });
 } else {
 alert('Please fill out all fields.');
 }
 };
render() {
const { name, age, email, isSubmitted } = this.state;
return (
 <div>
 {isSubmitted ? (
<p>Form submitted successfully!</p>
 ) : (
<form onSubmit={this.handleSubmit}>
 <div>
<label>Name:</label>
  <input
   type="text"
   name="name"
  value={name}
 onChange={this.handleChange}
  />
 </div>
 <br/>
<div>
    <label>Age:</label>
   <input
    type="number"
    name="age"
     value={age}
   onChange={this.handleChange}
    />
</div>
<br/>
<div>
<label>Email:</label>
<input
type="email"
 name="email"
 value={email}
onChange={this.handleChange}
 />
 </div>
 <br/>
<button type="submit">Submit</button>
</form>
 )}
</div>
 );
  }
}

export default Form;
