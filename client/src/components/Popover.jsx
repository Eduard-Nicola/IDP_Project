import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = theme => ({
  typography: {
    padding: theme.spacing(2),
  },
});

class PopoverWithButton extends Component {
    state = {
        anchorEl: null,
        setAnchorEl: null
    }
//   const [anchorEl, setAnchorEl] = React.useState(null);

  handleClick = (event) => {
    this.setAnchorEl(event.currentTarget);
  };

  handleClose = () => {
    this.setAnchorEl(null);
  };

  open = Boolean(this.state.anchorEl);
  id = this.open ? 'simple-popover' : undefined;

  render() {
    const { classes } = this.props;

    return (
        <div>
            <Button aria-describedby={this.id} variant="contained" color="primary" onClick={this.handleClick}>
            Open Popover
            </Button>
            <Popover
            id={this.id}
            open={this.open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            >
            <Typography className={classes.typography}>The content of the Popover.</Typography>
            </Popover>
        </div>
    );
  };
}

export default withStyles(useStyles)(PopoverWithButton);