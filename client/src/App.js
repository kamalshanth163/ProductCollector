import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AdminPage from './components/admin-page/AdminPage';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import DriverPage from './components/driver-page/DriverPage';
import UserPage from './components/user-page/UserPage';

function App() {
  return (
      <Router>
        <NavBar />
        <Switch>
            <Route path="/" exact component = {Home} />
            <Route path="/admin-page" component = {AdminPage} />
            <Route path="/login-page" component = {LoginPage} />
            <Route path="/register-page" component = {RegisterPage} />
            <Route path="/driver-page" component = {DriverPage} />
            <Route path="/user-page" component = {UserPage} />
        </Switch>
      </Router>
  );
}

export default App;
