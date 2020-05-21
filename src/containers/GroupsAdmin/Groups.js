import React, { Component } from 'react'
import Template from '../../hoc/Template/Template'
import axios from '../../axios-orders'
import { Group } from '../../components/Group/Group';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Chat from '../Chat/Chat';
import './GroupsAdmin.scss'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { getMapLocation } from '../../plugins/Geolocation'
import classes from '../CreateGroup/CreateGroup.css'

export default class Groups extends Component {
    constructor(){
        super()
        this.state = {
            groups: [],
            error: false,
            selectedGroup: null
        }
    }
    authUser = () => {
        let name = document.getElementById('name').value
        let latitude = this.marker.position.lat()
        let longitude = this.marker.position.lng()
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
    componentDidMount() {
        if (localStorage.getItem('id') == null) {
            window.location.href = window.location.origin + "/login"
        }
        axios.get('https://tisv-flood-control-api.herokuapp.com/groups')
        .then(response => {
            this.setState({ groups: response.data });
        })
        .catch(error => {
            this.setState({ error: true });
        });
        setInterval(() => {
            axios.get('https://tisv-flood-control-api.herokuapp.com/groups')
                .then(response => {
                    this.setState({ groups: response.data });
                })
                .catch(error => {
                    this.setState({ error: true });
                });
        }, 30000);
        let position = getMapLocation()
        setTimeout(() => {
          let myLatlng = new window.google.maps.LatLng(position.latitude,position.longitude);
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
        console.log(this.marker)
        }, 500);
    }
    groupSelectEvent = (group) => {
        this.setState({ selectedGroup: group });
    }
    groups = () => {
        let listOfGroups = []
        if (this.state.groups.length > 0) {
            listOfGroups = this.state.groups.map(group => {
                return <Group selectGroup={this.groupSelectEvent} group={group} />;
            })
                .reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
        }
        if (listOfGroups.length === 0) {
            return (<div></div>)
        }
        return listOfGroups
    }
    deselectGroup = () => {
        this.setState({ selectedGroup: null });
    }

    render() {
        return (
            <Template>
                <div className='chat'>
                    <div className={this.state.selectedGroup !== null ? 'inactive groups-box' : 'active groups-box'}>
                        <div className='groups-alert'><div>ALERTAS</div><button className='groups-new' onClick={this.handleOpen}>Novo Alerta</button></div>
                        {this.groups()}
                    </div>
                    <div className={this.state.selectedGroup !== null ? 'flexGrow' : 'inactive chat-box'}>
                        <Chat back={this.deselectGroup} activeGroup={this.state.selectedGroup}></Chat>
                    </div>
                </div>
            </Template>
        )
    }
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));