import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BarChartIcon from '@material-ui/icons/BarChart';
import FolderIcon from '@material-ui/icons/Folder';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import StarsIcon from '@material-ui/icons/Stars';
import firebase from 'firebase'


//Nav Imports
import { NavLink } from 'react-router-dom'
import SignOutButton from '../SignOut';

//Import Toolbar
import ToolbarInner from '../toolbar/Toolbar';
import '../toolbar/Toolbar.css';

//Import Editor
import Editor from '../editor/Editor'
import '../editor/Editor.css';
import { Edit, Home } from "@material-ui/icons";
//Import user info
import userInner from '../UserInfo/userInfo'
const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#212121',
    },

    drawerButton: {
        color: 'white',
        
    },

    appBar: {
        background: 'linear-gradient(45deg, #F4976C 30%, #FBE8A6 90%)',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: 'white',
    },

    signOutButton: {
        color: "white",
    },

    hide: {
        display: 'none',
    },

    dividerColor: {
        light: true,
    },
    drawer: {
        width: drawerWidth,
        height: "auto",
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#212121',
        color: '#212121',
        overflowX: "hidden", //Removes the left-right scroll bar thats in the drawer

    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        color: "white",
    },
    content: {
        flexGrow: 1,
        marginTop: 115,
        marginRight: 20,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        marginTop: 115,
        marginRight: 20,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    headerCloseDrawer: {
        justifySelf: "flex-end",
    }

}));






export default function AppBarDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    var user = firebase.auth().currentUser;
    var name, email

    if (user != null) {
        name = user.displayName;
        email = user.email;
               
  }
    userInner()[2]();
    return (
         
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >

                <Toolbar>
                
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Note Flow
                    </Typography>

                    
                </Toolbar>
            
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}
                >
                    Menu
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon className={classes.drawerButton} /> : <ChevronRightIcon className={classes.drawerButton} />}
                    </IconButton>
                </div>
                <Divider />
                <List className={classes.drawerPaper}>

                    <ListItem button key={'Sign Out'}>
                        <ListItemIcon > <SignOutButton style="color:#FBE8A6;" /></ListItemIcon>
                    </ListItem>

                    <NavLink activeClassName="active" to="/accountpage">
                        <ListItem className={classes.drawerButton} button key={'Account'}>
                            <ListItemIcon className={classes.drawerButton}> <AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary={'Account'} />
                        </ListItem>
                    </NavLink>

                    <NavLink exact activeClassName="active" to="/homepage">
                        <ListItem className={classes.drawerButton} button={true} key={'Home'}>
                            <ListItemIcon className={classes.drawerButton}> <HomeIcon /></ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItem>
                    </NavLink>

                    <NavLink activeClassName="active" to="/editor" onClick={e => userInner()[4]()}>
                        <ListItem className={classes.drawerButton} button key={'Editor'}>
                            <ListItemIcon className={classes.drawerButton}> <EditIcon /> </ListItemIcon>
                            <ListItemText primary={'Editor'} />
                        </ListItem>
                    </NavLink>

                    <ListItem className={classes.drawerButton} button key={'BarChartIcon'}>
                        <ListItemIcon className={classes.drawerButton} > <BarChartIcon /> </ListItemIcon>
                        <ListItemText primary={'Diagrams'} />
                    </ListItem>
                </List>
                <Divider color={"white"} />
                <List className={classes.drawerPaper}>
                    <NavLink activeClassName="active" to="/userFiles">
                        <ListItem className={classes.drawerButton} button key={'All Files'} >
                            <ListItemIcon className={classes.drawerButton}> <FolderIcon /> </ListItemIcon>
                            <ListItemText primary={'All Files'} />
                        </ListItem>
                    </NavLink>

                    

                </List>
                <div className={classes.drawerHeader}>
                    Signed in as {email}
                </div>
            </Drawer>

        </div>
    );
}