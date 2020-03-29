import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import '../App.css';
import { Link } from "react-router-dom";

const duration = 200;

const sidebarStyle = {
  transition: `width ${duration}ms`
};

const sidebarTransitionStyles = {
  entering: { width: 0 },
  entered: { width: '200px' },
  exiting: { width: '200px' },
  exited: { width: 0 }
};

const linkStyle = {
  transition: `opacity ${duration}ms`,
  color: '#FFFFFF'
};

const linkTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
};

export default class SidebarContent extends Component {
  renderLinks = () => {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div style={{
          ...linkStyle,
          ...linkTransitionStyles[state]
        }}>
          <Link style={ this.props.isOpen ? {} : { pointerEvents: 'none', display : 'none' }} to="/">
            <div className="link sidebar-link">Home</div>
          </Link>
          <Link style={ this.props.isOpen ? {} : { pointerEvents: 'none', display : 'none' }} to="/cars">
          <div className="link sidebar-link">Cars</div>
          </Link>
          <Link style={ this.props.isOpen ? {} : { pointerEvents: 'none', display : 'none' }} to="/about">
            <div className="link sidebar-link">About</div>
          </Link>
          <Link style={ this.props.isOpen ? {} : { pointerEvents: 'none', display : 'none' }} to="/contact">
            <div className="link sidebar-link">Contact</div>
          </Link>
          {/* <div className="link sidebar-link">Home</div>
          <div className="link sidebar-link">Cars</div>
          <div className="link sidebar-link">Contact</div> */}
        </div>
      )}
    </Transition>
  }
  
  render() {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div className="sidebar" style={{
          ...sidebarStyle,
          ...sidebarTransitionStyles[state]
        }}>
          {this.renderLinks()}
        </div>
      )}
    </Transition>
  }
}