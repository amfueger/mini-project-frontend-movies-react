import './App.css';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MovieContainer from './MovieContainer';
import Login from './Login';
import HeaderApp from './HeaderApp';
import Registration from './Registration';
import getCookie from 'js-cookie'; 

const My404 = () => {
  return (
    <div>
      You're lost, will you even be found?
    </div>
    )
}


class App extends Component {
  componentDidMount() {
    this.getToken()
  }

   logOut = async (e) => {
    e.preventDefault();
    console.log('being called')
    try { 
    const csrfCookie = getCookie('csrftoken');
    const logOutResponse = await fetch('http://localhost:8000/users/logout/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfCookie,
        'Content-Type': 'application/json',
      },
    });
    console.log(logOutResponse)
    const parsedResponse = await logOutResponse.json();

    if(parsedResponse.data === 'logout successful'){
      console.log('success logout')
      console.log(this.props.history.push('/'), 'props')
      console.log(' props')

    } else {
      console.log(parsedResponse.error)
    }

  } catch(err){
      console.log('error LogOut', err);
  }

}
  getToken = async () => {
    const token = await fetch('http://localhost:8000/users/getToken', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const tokenResponse = token.json();
    return tokenResponse;
  }
  render() {
    return (
      <div className="App">
        <HeaderApp logOut={this.LogOut} />
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Registration}/>
          <Route exact path="/movies" component={MovieContainer} logOut={this.logOut}/>
          <Route component={My404}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
