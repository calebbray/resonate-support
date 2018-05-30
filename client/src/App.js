import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Footer from './components/layout/Footer';

import './App.css';
import Navbar from './components/layout/Navbar';

//Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  //decode the token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and authenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //TODO: clear current profile
    //TODO: Redirect to login
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Navbar />
            <h1>Resonate: Support Tracker</h1>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
