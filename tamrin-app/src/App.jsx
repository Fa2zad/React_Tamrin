import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Products from "./Components/Products/com.products";
import Product from "./Components/Products/com.product";
import Details from "./Components/Products/com.product.details";
import NotFound from "./Components/Errors/com.notfound";

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router hashType="noslash">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <nav className="navbar">
              <ul className="nav navbar-nav">
                <li><Link to="/Products" >محصولات</Link></li>
                <li><Link to="/Add" >محصول جدید</Link></li>
                <li><Link to="/Details" >جزئیات محصول</Link></li>
              </ul>
            </nav>
          </header>
          <div className="container">
            <div className="row">
              <Switch>
                <Route exact path="/Products" component={Products} />
                <Route exact path="/Products/:message" component={Products} />
                <Route exact path="/Add" component={Product} />
                <Route exact path="/Details" component={Details} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>

    );
  }
}

export default App;
