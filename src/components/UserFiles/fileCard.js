import React from 'react';
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

import IconButton from '@material-ui/core/IconButton';
import FileImage from './FileImage.jpg'

const useStyles = makeStyles({
    root: {
      flex: 1,
    },
  
    firstCard: {
        minWidth: 190,
        flex: 1,
        marginLeft: 10,
    },
  
    card: {
        minWidth: 190,
        minHeight: 250,
        textAlign: 'left',
        flex: 1,
        marginLeft: 15,
    },
  
    media: {
        height: 210,
        marginLeft: 2,
        marginRight: 2,
        paddingLeft: 2,
        maxHeight: '100%',
        maxWidth: '95%',
        
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
    modeSwitch: {
      display: 'flex',
      alignItems: 'center',
      padding: 7,
      paddingLeft: 15,
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

  export default function FileCard() {
    const classes = useStyles();
  
    return (
        <div className={classes.contentContainer}>
  
          <div float={'left'}>
              <Card className={classes.card}>
              <CardActionArea>
              <CardMedia
              className={classes.media}
                  image={FileImage}
                  title="File View Template"
              />
              <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                  File Example
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  Example of file display
                  </Typography>
              </CardContent>
              </CardActionArea>
              <CardActions>
              <Button size="small" color="primary">
                  Options
              </Button>
              </CardActions>
              </Card>
          </div>

        </div>
  );
}
  