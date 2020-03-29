import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";

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

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Sidebar />
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <Link to="/login">
            <Button style={{color: "white"}} color="inherit">Login</Button>
          </Link>
          <Link to="/signup">
            <Button style={{color: "white"}} color="inherit">Sign up</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
