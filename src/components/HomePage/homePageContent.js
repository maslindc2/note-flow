import React, { useContext } from 'react';

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
import fileCardImage from '../Images/{get.myFiles}.jpg'
import accountCardImage from '../Images/MyAccount.jpg'

//Import Navigation
import { NavLink } from 'react-router-dom'

//Import Theme
import { useTheme } from '@material-ui/core/styles';
import ThemeContext from '../Theme/ThemeContext';
import themeInfo from '../Theme/themeInfo';
import reloadApp from '../../App'
import { withHandlers } from 'recompose';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },

  card: {
    minWidth: 300,
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },

  cardActionButton: {
    color: theme.palette.tertiary,
  },

  content: {
    flex: '1 0 auto',
  },

  contentContainer: {
    display: 'flex',
    width: '80%',
    margin: 15,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },

  cover: {
    width: 151,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
  },

  firstCard: {
    minWidth: 300,
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },

  media: {
    height: 150,
  },

  modeLD: {
    flex: 1,
    marginLeft: 20,
  },
  
}));


export default function HomeContent() {
  const { theme } = useTheme();
  const classes = useStyles(theme);

  const [state, setState] = React.useState(true);

  const handleChange = (event) => {
    setState(!state);
    if(state){
      console.log("checkedA 's up");
      themeInfo.mode ="dark";
      console.log(themeInfo.mode);
    }
    if(!state){
      console.log("checkedB 's up");
      themeInfo.mode ="light";
      console.log(themeInfo.mode);
    }
    reloadApp();
    window.location.reload();
    console.load(themeInfo.mode);
  };

  return (
      <div className={classes.contentContainer}>

        <div float={'left'}>
            <Card className={classes.firstCard}>
            <NavLink  activeClassName="active" to="/accountpage" style={{ textDecoration: 'none' }}>
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
            <Button className={classes.cardActionButton} size="small">
                Important
            </Button>
            <Button className={classes.cardActionButton} size="small">
                Learn More
            </Button>
            </CardActions>
            </Card>
        </div>

        <div float={'left'}>
            <Card className={classes.card}>
            <NavLink activeClassName="active" to="/userFiles" style={{ textDecoration: 'none' }}>
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
                <Button className={classes.cardActionButton} size="small">
                Important
                </Button>
                <Button className={classes.cardActionButton} size="small">
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