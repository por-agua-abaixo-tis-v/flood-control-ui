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
const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}
export default function Register(props) {
  const isFormValid = (emailField, nameField, passwordField) => {
    let isValid = true
    const email = emailField
    if (!validateEmail(email)) {
      isValid = false
      props.notification({
        title: "Email Invalido!",
        msg: "Verifique se o seu e-mail é valido.",
        type: "error",
      })
    }
    const name = nameField
    if (name === '' || name === undefined) {
      isValid = false
      props.notification({
        title: "Nome Vazio!",
        msg: "Verifique se o campo nome está preenchido.",
        type: "error",
      })
    }
    const password = passwordField
    if (password.length < 6) {
      isValid = false
      props.notification({
        title: "Sua senha deve possuir 6 digitos ou mais!",
        msg: "Verifique se a sua senha possui mais de 6 digitos.",
        type: "error",
      })
    }
    return isValid
  }
  const classes = useStyles();
  const sendRegister = () => {
    let email = document.getElementById('email').value
    let name = document.getElementById('name').value
    let password = document.getElementById('password').value
    if (isFormValid(email, name, password)) {
      axios.post('https://tisv-flood-control-api.herokuapp.com/users', {
        "email": email,
        "name": name,
        "pswd": password,
        'request_id': uuidv4()
      })
        .then(response => {
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('userName', response.data.name);
          window.location.replace(document.location.origin + '/groups');
        })
        .catch(error => {
          console.log(error)
          props.notification({
            title: "Oops!",
            msg: "Parece que este e-mail já está sendo usado!.",
            type: "error",
          })
        });
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registrar
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
            id="name"
            label="Seu nome"
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
            label="Sua senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => { sendRegister() }}
          >
            Cadastre-se
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Já possui uma conta? Entre aqui"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
