import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { sha256 } from 'js-sha256'
import '../App.css';

const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        input: {
          color: 'white',
        },
        notchedOutline: {
            borderColor: 'white',
          },
      },
      MuiButton: {
        root: {
            display: 'flex',
            justifyContent: 'center',
        }
      }
    },
});

class LoginBox extends Component {
    state = {
        loginStatus: '',
        emailStatus: '',
        passwordStatus: '',
        emailTextField: '',
        passwordTextField: '',
        redirect: false
    };

    constructor() {
        super();
        // Reset login state
        this.setState({ loginStatus: '' });
        this.setState({ emailStatus: '' });
        this.setState({ passwordStatus: '' });
    }

    handleEmailTextFieldChange = (textField) => {
        this.setState({ emailTextField: textField.target.value });
    };

    handlePasswordTextFieldChange = (textField) => {
        this.setState({ passwordTextField: textField.target.value });
    };

    handleLoginSignupClick = (route) => {
        // this.setState({ emailStatus: '' });
        // this.setState({ passwordStatus: '' });
        var emailError = false;
        var passwordError = false;
        var afterAt = this.state.emailTextField.substring(this.state.emailTextField.search('@'));
        if (this.state.emailTextField.search('@') === -1 || afterAt.search('\\.') === -1) {
            this.setState({ emailStatus: 'no valid email' });
            emailError = true;
        }
        if (this.state.emailTextField === '') {
            this.setState({ emailStatus: 'no email' });
            emailError = true;
        }
        if (this.state.passwordTextField === '') {
            this.setState({ passwordStatus: 'no password' });
            passwordError = true;
        }
        if (emailError === true || passwordError === true) {
            if (!emailError) {
                this.setState({ emailStatus: '' });
            }
            if (!passwordError) {
                this.setState({ passwordStatus: '' });
            }
            return;
        }

        var serverUrl = "/" + route;
        var password_hash = sha256(this.state.passwordTextField);

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: this.state.emailTextField,
                passwordHash: password_hash })
        };
        fetch(serverUrl, requestOptions)
            .then(
                response => response.json()
            )
            .then(
                data => {
                    this.setState({ loginStatus: data.status });
                    // console.log("status is ", data.status)
                    if (route === 'login' && data.status === 'found') {
                        this.props.callback(true, data.id);
                        this.setState({ redirect: true });
                    }
                    if (route === 'signup' && data.status === 'added') {
                        this.props.callback(true, data.id);
                        this.setState({ redirect: true });
                    }
                }
            );
    };
    
    displaySignupLink = () => {
        const type = this.props.type;
    
        if (type === 'login') {    
            return (
            <div>
                <p className='paragraphLogin'>Don't have an account?</p>
                <Link to="/signup">
                    <p className="paragraphLoginLink sidebar-link">Sign up here.</p>
                </Link>
            </div>
            );
        }
    
        return null;
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    renderEmailError = () => {
        // Display error in text field in case of login/register fail
        if (this.state.loginStatus === 'not found') {
            return (
                {
                    error: true,
                    helperText: "User not registered!"
                }
            );
        }
        if (this.state.loginStatus === 'exists') {
            return (
                {
                    error: true,
                    helperText: "User already registered!"
                }
            );
        }
        if (this.state.emailStatus === 'no email') {
            return (
                {
                    error: true,
                    helperText: "Please enter an email!"
                }
            );
        }
        if (this.state.emailStatus === 'no valid email') {
            return (
                {
                    error: true,
                    helperText: "Please enter a valid email!"
                }
            );
        }

        return {};
    }

    renderPasswordError = () => {
        // Display error in text field in case of login/register fail
        if (this.state.loginStatus === 'wrong') {
            return (
                {
                    error: true,
                    helperText: "Password incorrect!"
                }
            );
        }
        if (this.state.passwordStatus === 'no password') {
            return (
                {
                    error: true,
                    helperText: "Please enter a password!"
                }
            );
        }

        return {};
    }

    render() { 
        return ( 
            <ThemeProvider theme={theme}>
                {this.renderRedirect()}
                <form>
                    <TextField
                        {...this.renderEmailError()}
                        onChange={this.handleEmailTextFieldChange}
                        value={this.state.emailTextField}
                        className="emailBox"
                        style={{display: 'flex', justifyContent: 'center', maxWidth: '300px'}}
                        id="standard-basic"
                        label="Email"
                        variant="outlined"
                        color="primary"
                    />
                    <TextField
                        {...this.renderPasswordError()}
                        onChange={this.handlePasswordTextFieldChange}
                        value={this.state.passwordTextField}
                        className="passwordBox"
                        style={{display: 'flex', justifyContent: 'center', maxWidth: '300px'}}
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                    />
                </form>
                <Button onClick={() => this.handleLoginSignupClick(this.props.type)} className="loginButton" variant="contained">{this.props.buttonLabel}</Button>
                {this.displaySignupLink()}
            </ThemeProvider>
         );
    };
}
 
export default LoginBox;