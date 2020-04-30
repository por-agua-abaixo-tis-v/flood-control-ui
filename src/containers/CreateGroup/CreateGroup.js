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

export default function CreateGroups(props) {
  const classes = useStyles();
  const authUser = () => {
    let name = document.getElementById('name').value
    let latitude = document.getElementById('latitude').value
    let longitude = document.getElementById('longitude').value
    let range = document.getElementById('range').value
    axios.post('https://tisv-flood-control-api.herokuapp.com/groups', {
      "name": name,
      "latitude": parseFloat(latitude),
      "longitude": parseFloat(longitude),
      "range": range
    })
      .then(response => {
        window.location.href = document.location.origin + '/groups'
      })
      .catch(error => {
      });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Criar grupo
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome do Alerta"
            name="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="latitude"
            label="latitude"
            id="latitude"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="longitude"
            label="longitude"
            id="longitude"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="range"
            label="range"
            type="number"
            id="range"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => { authUser() }}
          >
            Criar Grupo
          </Button>
        </form>
      </div>
    </Container>
  );
}
