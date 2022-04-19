import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
// import DriverPage from './components/holder-page/HolderPage';
// import UserPage from './components/collector-page/CollectorPage';
import Dashboard from './components/pages/Dashboard';
import Products from './components/pages/Products';
import Orders from './components/pages/Orders';
import Account from './components/pages/Account';

function App() {
  return (
      <Router>
        {/* <NavBar /> */}
        <Switch>
            {/* <Route path="/" exact component = {Home} />
            <Route path="/login-page" component = {LoginPage} />
            <Route path="/register-page" component = {RegisterPage} />
            <Route path="/holder-page" component = {DriverPage} />
            <Route path="/collector-page" component = {UserPage} /> */}

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
