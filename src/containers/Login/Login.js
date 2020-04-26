import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../axios-orders'
import { store } from 'react-notifications-component';
import {NotificationContainer,NotificationManager} from 'react-notifications';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const authUser = () =>{
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    axios.post( 'https://tisv-flood-control-api.herokuapp.com/users/auth' ,{
      "email":email,
      "pswd":password,
    })
    .then( response => {
        localStorage.setItem('id',response.data.user.id)
        localStorage.setItem('userName',response.data.user.name)
        window.location.href = document.location.origin + '/groups'
    } )
    .catch( error => {
      NotificationManager.error('Error message', 'Click me!', 5000);
    });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Seu e-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Seu senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{authUser()}}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Não possui uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <NotificationContainer/>
    </Container>
  );
}
