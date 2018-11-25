import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import getCookie from 'js-cookie';


class Registration extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: ''
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const csrfCookie = getCookie('csrftoken');
    const registrationResponse = await fetch('http://localhost:8000/users/', {
      method: 'POST',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify(this.state),
      headers: {
        'X-CSRFToken': csrfCookie,
        'Content-Type': 'application/json',

      },
    });
    const parsedResponse = await registrationResponse.json();

    if(parsedResponse.data === 'registration successful'){
      // change our component
      console.log('success registration');

      // this automatically get passed to your component as a prop
      this.props.history.push('/movies');
    } else {
      console.log('registration rejected');
      console.log(parsedResponse.data);
    }
  }
  render(){
    return (
      
      <Form onSubmit={this.handleSubmit}>
        <Label>Username</Label>
        <Form.Input type='text' name='username' onChange={this.handleChange} />
        <Label>Password</Label>
        <Form.Input type='password' name='password' onChange={this.handleChange} />
        <Button type="Submit" color="green">Login</Button>
      </Form>
      
      )
  }
}

export default Registration;