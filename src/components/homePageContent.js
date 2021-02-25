import React from 'react';

//Import Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { convertCompilerOptionsFromJson } from 'typescript';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Import images
import fileCardImage from './Images/{get.myFiles}.jpg'
import accountCardImage from './Images/MyAccount.jpg'

//Import Navigation
import { NavLink } from 'react-router-dom'

//Import CSS
import './Homepage.css'

const useStyles = makeStyles({
  root: {
    flex: 1,
  },

  firstCard: {
      minWidth: 300,
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },

  card: {
      minWidth: 300,
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },

  modeLD: {
      flex: 1,
      marginLeft: 20,
  },

  media: {
    height: 150,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  
  contentContainer: {
    
      display: 'flex',
      width: '80%',
      margin: 15,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'center',
  },
  
});



export default function HomeContent() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
      <div className={classes.contentContainer}>

        <div float={'left'}>
            <Card className={classes.firstCard}>
            <NavLink  activeClassName="active" to="/accountpage">
              <CardActionArea>
              <CardMedia
              className={classes.media}
                  image={accountCardImage}
                  title="My Account"
              />
              <CardContent>
                  <Typography gutterBottom variant="h5" color="textPrimary" component="h2">
                  My Account
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  User Account, Settings, and More
                  </Typography>
              </CardContent>
              </CardActionArea>
            </NavLink>
            <CardActions>
            <Button size="small" color="primary">
                Important
            </Button>
            <Button size="small" color="primary">
                Learn More
            </Button>
            </CardActions>
            </Card>
        </div>

        <div float={'left'}>
            <Card className={classes.card}>
            <NavLink activeClassName="active" to="/userFiles">
              <CardActionArea>
                  <CardMedia
                  className={classes.media}
                  image={fileCardImage}
                  title="Note Library"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" color="textPrimary" component="h2">
                      My Notes
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                      Library of all saved notes.
                  </Typography>
                  </CardContent>
              </CardActionArea>
            </NavLink>
            <CardActions>
                <Button size="small" color="primary">
                Important
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
            </Card>
        </div>

        <div float={'left'}>
            <Card className={classes.modeLD}>
                <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    Theme
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Set your visibility preference
                </Typography>
                </CardContent>
                <div className={classes.modeSwitch}>
                <FormControlLabel
                control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                label="Dark Mode"
                />
                </div>
            </div>
            </Card>
        </div>
        
    </div>
  );
}