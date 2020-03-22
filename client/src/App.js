import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import ButtonAppBar from './components/ButtonAppBar';
import MainPhoto from './263730.jpg'

class App extends Component{
  
  render() {
    var sectionStyle = {
      width: "100%",
      height: "100vh",
      backgroundImage: "url(" + MainPhoto + ")"
    }

    return (
      <div className="App">
        <ButtonAppBar title="Car-n-go"/>
        <section style={sectionStyle}>
          <h1 className='display-1 text-primary title'>Welcome to my website!</h1>
        </section>
      </div>
    );
  }
}

export default App;
