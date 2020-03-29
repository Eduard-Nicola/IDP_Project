import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import 'typeface-roboto';
import ButtonAppBar from './components/ButtonAppBar';
import MainPhoto from './263730.jpg'
import LoginBox from './components/LoginBox'

class App extends Component{
  
  render() {
    var bodyStyle = {
      width: "100%",
      height: "100vh",
      backgroundImage: "url(" + MainPhoto + ")"
    }

    return (
      <Router>
        <div className="App">
        </div>
        <Switch>
          <Route exact path="/">
            <ButtonAppBar title="Car-n-go: car rental services"/>
              <body style={bodyStyle}>
                <h1 className='display-1 text-primary title'>Welcome to our website!</h1>
                <p className='paragraph'>We offer car rental services for affordable prices. We have multiple dealerships located in main airports and large cities.</p>
              </body>
          </Route>
          <Route path="/cars">
            <ButtonAppBar title="Our cars"/>
              <body style={bodyStyle}>
                <h1 className='display-1 text-primary title'>Cars page!</h1>
              </body>
          </Route>
          <Route path="/about">
            <ButtonAppBar title="About us"/>
              <body style={bodyStyle}>
                <h1 className='display-1 text-primary title'>About page!</h1>
              </body>
          </Route>
          <Route path="/contact">
            <ButtonAppBar title="Contact us"/>
              <body style={bodyStyle}>
                <h1 className='display-1 text-primary title'>Contact page!</h1>
              </body>
          </Route>
          <Route path="/login">
            <ButtonAppBar title="Login"/>
              <body style={bodyStyle}>
                <LoginBox buttonLabel="Login" isLogin={true}/>
              </body>
          </Route>
          <Route path="/signup">
            <ButtonAppBar title="Sign up"/>
              <body style={bodyStyle}>
                <LoginBox buttonLabel="Sign up" isLogin={false}/>
              </body>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
