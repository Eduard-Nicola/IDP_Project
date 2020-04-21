import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Sidebar from './Sidebar';
import { Link, Redirect } from "react-router-dom";

let redirect = false;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

const handleLogoutClick = (props) => {
  redirect = true;
  props.callback(false);
};

const renderButtons = (props, classes) => {
  // Display buttons in regard of login status

  // Is logged in
  if (props.isLoggedIn === true) {
    return (
      <React.Fragment>
        <Button style={{color: "white"}} color="inherit">My Cars</Button>
        <Button onClick={() => handleLogoutClick(props)} style={{color: "white"}} color="inherit">Logout</Button>
      </React.Fragment>
    );
  }

  // No login
  return (
    <React.Fragment>
      <Link to="/login">
          <Button style={{color: "white"}} color="inherit">Login</Button>
        </Link>
        <Link to="/signup">
          <Button style={{color: "white"}} color="inherit">Sign up</Button>
        </Link>
    </React.Fragment>
  );
};

const renderRedirect = () => {
  if (redirect) {
      redirect = false;
      return <Redirect to='/' />
  }
}

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {renderRedirect()}
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Sidebar />
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          {renderButtons(props, classes)}
        </Toolbar>
      </AppBar>
    </div>
  );
}
