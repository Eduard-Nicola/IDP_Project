import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DatePicker from './DatePicker.jsx';
import 'date-fns';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    backgroundColor: 'black',
    color: 'white'
  },
  typographyError: {
    padding: theme.spacing(2),
    backgroundColor: 'black',
    color: 'red'
  },
  button: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  // 0 is no reservation, -1 is error and 1 is reservation successful
  const [resStatus, setResStatus] = React.useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const callbackFromDate = (date) => {
    setFromDate(date);
  }

  const callbackToDate = (date) => {
    setToDate(date);
  }

  const checkDate = (fromDate, toDate) => {
    var currentDate = new Date();

    if (fromDate.getDate() < currentDate.getDate() || fromDate.getMonth() < currentDate.getMonth() ||
    fromDate.getFullYear() < currentDate.getFullYear() || toDate.getDate() <= fromDate.getDate() ||
    toDate.getMonth() < fromDate.getMonth || toDate.getFullYear() < fromDate.getFullYear()) {
      return false;
    }

    return true;
  }

  const handleReserveClick = () => {
    var sendReq = 0;
    var serverUrl = "http://localhost:8080/reserve";
    var user_id = props.userId;
    var car_id = props.data.id;
    if (fromDate === null || toDate === null) {
      sendReq = -1;
      setResStatus(-1);
      return;
    }
    var reserveFromDate = fromDate.getDate() + "." + (fromDate.getMonth() + 1) + "." + fromDate.getFullYear();
    var reserverToDate = toDate.getDate() + "." + (toDate.getMonth() + 1) + "." + toDate.getFullYear();

    // Check dates to be older than today's date, and minimum 1 day of reservation
    // setResStatus(-1) in case of errors
    if (checkDate(fromDate, toDate) === false) {
      sendReq = -1;
      setResStatus(-1);
    }

    if (sendReq !== -1) {
      const requestOptions = {
          method: 'POST',
          headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              userId: user_id,
              carId: car_id,
              fromDate: reserveFromDate,
              toDate: reserverToDate })
      };
      fetch(serverUrl, requestOptions)
          .then(
              response => response.json()
          )
          .then(
              data => {
                  if (data.status === 'updated') {
                    // setResStatus(1);
                    sendReq = 1;
                  }
                  if (data.status === 'not found') {
                    // setResStatus(-1);
                    sendReq = -1;
                  }
                  setResStatus(sendReq);
                  setTimeout(() => {
                    props.callback();
                  }, 1000);
              }
          );
    }
  }

  const handleUnReserveClick = () => {
    var sendReq = 0;
    var serverUrl = "http://localhost:8080/unreserve";
    var car_id = props.data.id;

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            carId: car_id })
    };
    fetch(serverUrl, requestOptions)
        .then(
            response => response.json()
        )
        .then(
            data => {
                if (data.status === 'updated') {
                  // setResStatus(1);
                  sendReq = 0;
                }
                if (data.status === 'not found') {
                  // setResStatus(-1);
                  sendReq = -1;
                }
                setResStatus(sendReq);
                props.callback();
            }
        );
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderErrorField = () => {
    if (resStatus === -1) {
      return <Typography className={classes.typographyError}>Could not make reservation! Please check dates.</Typography>
    }
    if (resStatus === 1) {
      return <Typography className={classes.typography}>Reservation successful!</Typography>
    }
  }

  const renderReserve = () => {
    // Render based on login status
    // and context: my cars or all cars
    if (props.isLoggedIn) {
      if (props.myCars) {
        return (
          <React.Fragment>
            <Typography className={classes.typography}>From: {props.data.reservedFrom}</Typography>
            <Typography className={classes.typography}>To: {props.data.reservedTo}</Typography>
            <Typography className={classes.typography}>
              <Button className={classes.button} onClick={handleUnReserveClick} variant="contained" color="primary">
                Remove reservation
              </Button>
            </Typography>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Typography className={classes.typography}>
              From: 
              <DatePicker callback={callbackFromDate}/>
            </Typography>
            <Typography className={classes.typography}>
              To: 
              <DatePicker callback={callbackToDate}/>
            </Typography>
            {renderErrorField()}
            <Typography className={classes.typography}>
              <Button className={classes.button} onClick={handleReserveClick} variant="contained" color="primary">
                Reserve
              </Button>
            </Typography>
          </React.Fragment>
        );
      }
    } else {
      return (
        <Typography className={classes.typography}>Please log in to reserve this car!</Typography>
      );
    }
  }

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Info
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>Make: {props.data.make}</Typography>
        <Typography className={classes.typography}>Model: {props.data.model}</Typography>
        <Typography className={classes.typography}>Year: {props.data.prodYear}</Typography>
        <Typography className={classes.typography}>Displacement: {props.data.displacement} cm3</Typography>
        <Typography className={classes.typography}>Horsepower: {props.data.horsepower} HP</Typography>
        <Typography className={classes.typography}>Fuel type: {props.data.fuelType}</Typography>
        <Typography className={classes.typography}>Fuel economy: {props.data.fuelEconomy} l/100km</Typography>
        <Typography className={classes.typography}>Price/day: {props.data.pricePerDay} €</Typography>
        {renderReserve()}
      </Popover>
    </div>
  );
}