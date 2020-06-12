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
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    height:'75vh',
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

export default function Login(props) {
  const classes = useStyles();
  const authUser = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    axios.post('https://tisv-flood-control-api.herokuapp.com/users/auth', {
      "email": email,
      "pswd": password,
      'request_id': uuidv4()
    })
      .then(response => {
        localStorage.setItem('id', response.data.user.id)
        localStorage.setItem('userName', response.data.user.name)
        localStorage.setItem('adm', response.data.user.adm)
        window.location.href = document.location.origin + '/groups'
      })
      .catch(error => {
        props.notification({
          title: "Usuário ou senha inválidos!",
          msg: "Caso não possua uma conta clique aqui!",
          type: "error",
          action: {
            label: "Registrar-se",
            callback: function () {
              window.location.href = document.location.origin + '/register'
            }
          }
        })
      });
  }
  return (
    <Container className={classes.backgroundColor} component="main" maxWidth="xs">
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
            className={classes.submit}
            color='primary'
            onClick={() => { authUser() }}
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
    </Container>
  );
}
