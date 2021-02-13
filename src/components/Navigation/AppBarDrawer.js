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


//Nav Imports
import { NavLink } from 'react-router-dom'
import SignOutButton from '../SignOut';

//Import Toolbar
import ToolbarInner from '../toolbar/Toolbar';
import '../toolbar/Toolbar.css';

//Import Editor
import Editor from '../editor/Editor'
import '../editor/Editor.css';
import {Edit, Home} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#424242',
    },
    appBar: {
        background: 'linear-gradient(45deg, #303f9f 30%, #7986cb 90%)',
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
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        height: "auto",
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,

    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
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

    function home(e) {

    }

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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List className={classes.drawerPaper}>

                    <ListItem button key={'Sign Out'}>
                        <ListItemIcon> <SignOutButton /></ListItemIcon>
                    </ListItem>

                    <NavLink exact activeClassName="active" to="/">
                        <ListItem button={true} key={'Home'}>

                                <ListItemIcon> <AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary={'Home'}/>

                        </ListItem>
                    </NavLink>

                    <NavLink  activeClassName="active" to="/editor">
                        <ListItem button key={'Editor'}>
                            <ListItemIcon> <EditIcon /> </ListItemIcon>
                            <ListItemText primary={'Editor'} />
                        </ListItem>
                    </NavLink>

                    <ListItem button key={'BarChartIcon'}>
                        <ListItemIcon> <BarChartIcon /> </ListItemIcon>
                        <ListItemText primary={'Diagrams'} />
                    </ListItem>
                </List>
                <Divider />
                <List className={classes.drawerPaper}>
                    <ListItem button key={'All Files'} >
                        <ListItemIcon> <FolderIcon/> </ListItemIcon>
                        <ListItemText primary={'All Files'} />
                    </ListItem>

                    <ListItem button key={'Tags'}>
                        <ListItemIcon> <LocalOfferIcon /> </ListItemIcon>
                        <ListItemText primary={'Tags'} />
                    </ListItem>

                    <ListItem button key={'Important'}>
                        <ListItemIcon> <StarsIcon /> </ListItemIcon>
                        <ListItemText primary={'Important'} />
                    </ListItem>
                </List>
            </Drawer>

        </div>
    );
}
//Fixed nav bar sizing as you resize the window
//Put in material ui icons
//Changing navigation panel with material ui
//background is next
