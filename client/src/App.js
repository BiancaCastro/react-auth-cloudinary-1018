import React, { Component } from 'react';
import './App.css';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Message from './components/Message';
import AuthService from './components/auth/AuthService';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    }

    this.authService = new AuthService();

    this.fetchUser();
  }

  fetchUser = () => {
    this.authService.loggedin()
    .then(user => this.setState({...this.state, user}));
  }

  getUser = (user) => {
    this.setState({...this.state, user})
  }

  logout = () => {
    this.authService.logout()
    .then(() => this.setState({...this.state, user:null}));
  }

  render() {
    const welcome = this.state.user ? 
      <div>
      	<p>Hola {this.state.user.username}</p>
      	<button onClick={this.logout}>Logout</button> 
      </div>
      
    : <p>No user</p>
    
    return (
      <div className="App">
        {welcome}
        <Message user={this.state.user} />
        <Signup getUser={this.getUser} />   
        <Login getUser={this.getUser} />     
      </div>
    );
  }
}

export default App;
