import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import PopoverWithButton from './Popover.jsx';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "#484848",
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

//   The example data is structured as follows:
 
//   import image from 'path/to/image.jpg';
//   [etc...]

class TitlebarGridList extends Component {
  // INSERT INTO car (make, model, prod_year, displacement, horsepower, fuel_type, fuel_economy, price_per_day, reserved, image_url) VALUES ("Skoda", "Octavia", "2013", 1998, 150, "Gasoline", 8, 150, 0, "skoda_octavia.jpg");
  state = {
    ready: false
  }

  tileData = [];

  componentDidMount() {
    var serverUrl = "http://localhost:8080/cars";
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
                  //object.image = null;
                  this.tileData.push(object);
                });
            
                // Set image URLs
                this.tileData.map(car => {
                  var imgUrl = "http://localhost:8080/" + car.imageUrl;
                  
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
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">Available cars</ListSubheader>
            </GridListTile>
            {this.tileData.map((tile) => (
              <GridListTile key={tile.id}>
                <img src={tile.image} alt={tile.make} />
                <GridListTileBar
                  title={tile.make}
                  subtitle={<span>{tile.model}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${tile.make}`} className={classes.icon}>
                      <PopoverWithButton/>
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