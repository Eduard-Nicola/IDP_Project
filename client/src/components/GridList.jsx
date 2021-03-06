import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Popover from './Popover.jsx';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "#000000",
  },
  gridList: {
    width: 500,
    height: 600,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class TitlebarGridList extends Component {
  state = {
    ready: false
  }

  tileData = [];

  componentDidMount() {
    var serverUrl = "/cars";
    // Get cars from server
    const requestOptions = {
      method: 'GET',
      headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' }
    };
    fetch(serverUrl, requestOptions)
        .then(
            response => response.json()
        )
        .then(
            data => {
                data.forEach(object => {
                  this.tileData.push(object);
                });
            
                // Set image URLs
                this.tileData.map(car => {
                  var imgUrl = "/photos/" + car.imageUrl;
                  
                  car.image = imgUrl;

                  return car;
                });
                
                this.setState({ ready: true });
            }
        );
  }

  render() {
    const { classes } = this.props;

    if (this.state.ready === false) {
      return null;
    } else {
      return (
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}/>
            {this.tileData.filter((tile) => {
              if (tile.reserved === this.props.reservedId) {
                return true;
              }
              return false;
            })
            .map((tile) => (
                <GridListTile key={tile.id}>
                  <img src={tile.image} alt={tile.make} />
                  <GridListTileBar
                    title={tile.make}
                    subtitle={<span>{tile.model}</span>}
                    actionIcon={
                      <IconButton aria-label={`info about ${tile.make}`} className={classes.icon}>
                        <Popover
                          data={tile}
                          isLoggedIn={this.props.isLoggedIn}
                          userId={this.props.userId}
                          myCars={this.props.myCars}
                          callback={this.props.callback}
                        />
                      </IconButton>
                    }
                  />
                </GridListTile>
            
            ))}
          </GridList>
        </div>
      );
    }
  }
}

export default withStyles(useStyles)(TitlebarGridList);