import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../axios-orders'
import { render } from '@testing-library/react';
import classes from './CreateGroup.css'
import { getMapLocation } from '../../plugins/Geolocation'
import { v4 as uuidv4 } from 'uuid';

export default class CreateGroups extends Component {
  authUser = () => {
    let name = document.getElementById('name').value
    let latitude = this.marker.position.lat()
    let longitude = this.marker.position.lng()
    let range = document.getElementById('range').value
    axios.post('https://tisv-flood-control-api.herokuapp.com/groups', {
      "name": name,
      "latitude": parseFloat(latitude),
      "longitude": parseFloat(longitude),
      "range": range,
      'uuid': uuidv4()
    })
      .then(response => {
        this.props.notification({
          title: "Grupo criado com sucesso",
          msg: "Agora é só esperar a aprovação de um administrador!",
          type: "success"
        })
        let name = document.getElementById('name').value
        let range = document.getElementById('range').value
      })
      .catch(error => {
      });
  }
  componentDidMount(){
    let position = getMapLocation()
    if (localStorage.getItem('id') == null) {
        window.location.href = window.location.origin + "/login"
    }
    setTimeout(() => {
    let myLatlng = new window.google.maps.LatLng(position.latitude, position.longitude);
    let mapOptions = {
      zoom: 15,
      center: myLatlng
    }
    let map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
    this.marker = new window.google.maps.Marker({
      position: myLatlng,
      map: map,
      draggable:true,
      title:"Drag me!"
    });
    }, 500);
  }
  render(){
    return(
    <div>
      <CssBaseline />
      <div className={classes.paper}>
          <span className={classes.title}>Criar grupo</span>
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
          <div className={classes.map} id='map'/>
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
            onClick={() => { this.authUser() }}
          >
            Criar Grupo
          </Button>
        </form>
      </div>
    </div>
  )}
}
