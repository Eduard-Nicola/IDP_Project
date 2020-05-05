import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import 'typeface-roboto';
import ButtonAppBar from './components/ButtonAppBar';
import MainPhoto from './263730.jpg'
import LoginBox from './components/LoginBox'
import GridList from './components/GridList'

class App extends Component {
  state = {
    isLoggedIn: false,
    userId: -1,
    remountAll: false,
    remountLocal: false
  }

  componentDidMount() {
    var loginStatus = false;
    var id = -1;

    if (sessionStorage.getItem('loginStatus')) {
      loginStatus = JSON.parse(sessionStorage.getItem('loginStatus'));
    }
    if (sessionStorage.getItem('loginStatus')) {
      id = parseInt(sessionStorage.getItem('userId'));
    }

    this.setState({ isLoggedIn: loginStatus,
                    userId: id });
  }

  getLoginStatus = (loginStatus, id) => {
    this.setState({ isLoggedIn: loginStatus });
    this.setState({ userId: id });
    sessionStorage.setItem('loginStatus', JSON.stringify(loginStatus));
    sessionStorage.setItem('userId', id);
  }

  onRemountAll = () => {
    this.setState({ remountAll: !this.state.remountAll });
  }

  onRemountLocal = () => {
    this.setState({ remountLocal: !this.state.remountLocal });
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
      backgroundColor: "#000000"
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
            <ButtonAppBar title="Available cars" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={carsBodyStyle}>
                <GridList 
                  key={String(this.state.remountAll)} 
                  isLoggedIn={this.state.isLoggedIn} 
                  userId={this.state.userId} 
                  reservedId={0} 
                  myCars={false}
                  callback={this.onRemountAll}
                />
              </body>
          </Route>
          <Route key="cars" path="/mycars">
            <ButtonAppBar title="My cars" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={carsBodyStyle}>
                <GridList 
                  key={String(this.state.remountLocal)} 
                  isLoggedIn={this.state.isLoggedIn} 
                  userId={this.state.userId} 
                  reservedId={this.state.userId} 
                  myCars={true}
                  callback={this.onRemountLocal}
                />
              </body>
          </Route>
          <Route key="about" path="/about">
            <ButtonAppBar title="About us" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={bodyStyle}>
                <span className='text'> We are fairly new on the market </span>
                <span className='text'> but we make sure all our clients are satisifed. </span>
                <span className='text'> We started out small in Bucharest but we expanded across all Europe. </span>
              </body>
          </Route>
          <Route key="contact" path="/contact">
            <ButtonAppBar title="Contact" isLoggedIn={this.state.isLoggedIn} callback={this.getLoginStatus}/>
              <body style={bodyStyle}>
                <span className='text'> Car-n-go. All rights reserved. </span>
                <span className='text'> Email: carngo@cars.com </span>
                <span className='text'> Phone: +4072457849 </span>
                <span className='text'> Headquarters: Calea Victoriei 7, Bucharest, Romania </span>
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
