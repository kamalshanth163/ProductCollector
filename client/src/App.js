import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Account from './pages/Account';

function App() {
  return (
      <Router>
        <Switch>
            <Route path="/" exact component = {Home} />
            <Route path="/login-page" component = {LoginPage} />
            <Route path="/register-page" component = {RegisterPage} />
            <Route path="/dashboard" component = {Dashboard} />
            <Route path="/products" component = {Products} />
            <Route path="/orders" component = {Orders} />
            <Route path="/account" component = {Account} />
        </Switch>
      </Router>
  );
}

export default App;
