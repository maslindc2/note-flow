import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './welcomepage.css'
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SignIn from '../SignIn';
import { PasswordForgetLink } from '../PasswordForget';
import { SignUpLink } from '../SignUp';
import SignUp from '../SignUp';
import { nodeName } from 'jquery';
import { idText } from 'typescript';

//Import textField
import TextField from '@material-ui/core/TextField';
import './welcomepage.css';
import welcomeTopImg from './welcomeTopImg.png';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import NoteFlowLogo from './NoteFlowLogo.png'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paperRoot: {
        display: 'flex',
        '& > *': {


            width: 500,
            minwidth: '100%',
            minHeight: 250,
            height: 'fit-content',
            padding: 20,
            paddingBottom: 25,
            //height will be 45 when done
        },
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },

    root: {

        minHeight: '100%',
        minwidth: '100%',
        height: 'auto',
        background: 'radial-gradient(white 10%, #FBE8A6, #F4976C 80%)',
        //background: 'linear-gradient(to bottom right, #F4976C 10%, transparent 30% 70%, #FBE8A6 90%)',

        justifyContent: 'center',
        justifyItems: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        textAlign: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '20%',
    },



    container: {
        width: '100%',

    },

    pageButton: {
        '&#signin': {
            marginTop: 15,
        },
        color: 'white',
        backgroundColor: '#1B98E0',
        '&:hover': {
            backgroundColor: '#212121',
        },
        width: 200,
        height: 40,
        textDecoration: 'none',
        margin: 5,
        marginTop: 10,
    },

    paperContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },


}));

/*
</NavLink> 

                   <NavLink activeClassName="active" to="/signinpage">
                  <Button className={classes.pageButton} variant="contained">
                        Sign In
                  </Button>
                   </NavLink>
*/



export default function WelcomePage() {
    const classes = useStyles();

    function displayElement(id) {
        var x = document.getElementById(id)
        if (x.style.display == 'block') {
            x.style.display = 'none';
        } else {
            x.style.display = 'block';
        }
    }

    return (

        <div className={classes.root}>
            <div id="logoContainer"><img src={NoteFlowLogo} id="logo" /></div>
            <div class="background" />
            <a href="#welIntro" ><ArrowDownwardIcon href="#welIntro" id="welPageArrow" /></a>
            <div class="introFlexWrap">
                <div id="welIntro">
                    <h2>Taking Notes isn't Always Easy</h2>
                    <Typography variant="subtitle1" textAlign="left">
                        Take it from us, we know what it's like to be caught up in the surprising difficulties of taking notes.
                        Despite the speed and convenience of typed notes, there's hang-ups that just seem unavoidable. Math functions
                        are seemingly impossible to enter into a document without either butchering the look of the equation or spending
                        a large amount of time inputting symbols that do not come naturally to most text editors. Developers run into a similar
                        situation; code formatting is almost always all but lost when attempts to type outside of designated software.
                        </Typography>
                    <Typography variant="subtitle1" textAlign="left">
                        Here's the good news: we understand. The Note Flow team has plenty of experience with the frustrations of modern-day
                        note-taking, especially for those who have formatting and symbolic needs that lie outside of the general humanities. Our
                        experiences drove us to attempt to achieve something that's avoided STEM scholars for too long: a way to take notes that
                        just, well, flow!
                    </Typography>
                </div>

                <div className={classes.paperRoot}>
                    <Paper variant="outlined" elevation={15}>
                        <h2>Join us and Check it Out for Yourself!</h2>
                        <div className={classes.paperContent} flex-bases="5px">
                            <Button className={classes.pageButton} variant="contained" onClick={() => { displayElement('signUpForm') }}>
                                Sign Up
                        </Button>
                            <div id={"signUpForm"} style={{ display: 'none' }}>
                                <SignUp />

                            </div>
                            <Button className={classes.pageButton} id="signin" variant="contained" onClick={() => { displayElement('signInForm') }}>
                                Sign In
                        </Button>
                            <div id={"signInForm"} style={{ display: 'none' }}>
                                <SignIn />
                                <PasswordForgetLink />
                            </div>

                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
}