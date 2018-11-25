import React from 'react';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const HeaderApp = (props) => {
  return (
    <Header>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li> <Link to='/' onClick={props.logOut}> Logout</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/register">Registration</Link></li>
      </ul>
    </Header>
    )
}

export default HeaderApp;
