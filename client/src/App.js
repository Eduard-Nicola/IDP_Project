import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import 'typeface-roboto';
import ButtonAppBar from './components/ButtonAppBar';
import MainPhoto from './263730.jpg'
import LoginBox from './components/LoginBox'
import GridList from './components/GridList'

class App extends Component{
  state = {
    isLoggedIn: false
  }

  getLoginStatus = (loginStatus) => {
    this.setState({ isLoggedIn: loginStatus });
  }
  
  render() {
    var bodyStyle = {
      width: "100%",
      height: "100vh",
      backgroundImage: "url(" + MainPhoto + ")"
    };

    var carsBodyStyle = {
      width: "100%",
      height: "100vh",
      backgroundColor: "#484848"
    };

    return (
      <Router>
        <Switch>
          <Route key="main" exact path="/">
            <ButtonAppBar title="Car-n-go: car rental services" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={bodyStyle}>
                <h1 className='display-1 text-primary title'>Welcome to our website!</h1>
                <p className='paragraph'>We offer car rental services for affordable prices. We have multiple dealerships located in main airports and large cities.</p>
              </body>
          </Route>
          <Route key="cars" path="/cars">
            <ButtonAppBar title="Our cars" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={carsBodyStyle}>
                <GridList />
              </body>
          </Route>
          <Route key="about" path="/about">
            <ButtonAppBar title="About us" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={bodyStyle}>
                <h1 className='display-1 text-primary title'>About page!</h1>
              </body>
          </Route>
          <Route key="contact" path="/contact">
            <ButtonAppBar title="Contact" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={bodyStyle}>
                <h1 className='display-1 text-primary title'>Contact page!</h1>
              </body>
          </Route>
          <Route key="login" path="/login">
            <ButtonAppBar title="Login" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={bodyStyle}>
                <LoginBox buttonLabel="Login" type='login' callback={this.getLoginStatus}/>
              </body>
          </Route>
          <Route key="signup" path="/signup">
            <ButtonAppBar title="Sign up" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={bodyStyle}>
                <LoginBox buttonLabel="Sign up" type='signup' callback={this.getLoginStatus}/>
              </body>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
