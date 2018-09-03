import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from "./Components/Header/com.header.jsx";
import Home from "./Components/Home/com.home.jsx";
import About from "./Components/About/com.about.jsx";
import Contact from "./Components/Contacts/com.contact.jsx";
import NotFound from "./Components/NotFound/com.notfound.jsx";

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     listDataFromChild: null
  //   };    
  // }
  
  state = {
    title: "Home"
  }
  compponentWillMount () {
    this.setState({
      title: this.props.callbackFromParent()
    });
  }
  render() {
    return (
      <Router>
          <div className="App">
            <Header title={this.state.title} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Contact" component={Contact} />
              <Route path="/About" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
      </Router>
      
    );
  }
}

export default App;
