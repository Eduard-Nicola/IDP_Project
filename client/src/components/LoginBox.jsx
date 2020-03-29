import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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

function displaySignupLink(props) {
    const isLogin = props.isLogin;

    if (isLogin) {    
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
}

class LoginBox extends Component {
    render() { 
        return ( 
            <ThemeProvider theme={theme}>
                <form>
                    <TextField
                        className="emailBox"
                        style={{display: 'flex', justifyContent: 'center', maxWidth: '300px'}}
                        id="standard-basic"
                        label="Email"
                        variant="outlined"
                        color="white"
                        />
                    <TextField
                        className="passwordBox"
                        style={{display: 'flex', justifyContent: 'center', maxWidth: '300px'}}
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                    />
                </form>
                <Button className="loginButton" variant="contained">{this.props.buttonLabel}</Button>
                {displaySignupLink(this.props)}
            </ThemeProvider>
         );
    }
}
 
export default LoginBox;