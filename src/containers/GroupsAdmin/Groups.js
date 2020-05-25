import React, { Component } from 'react'
import Template from '../../hoc/Template/Template'
import axios from '../../axios-orders'
import { Group } from '../../components/Group/Group';
import './GroupsAdmin.scss'
import { makeStyles } from '@material-ui/core/styles';
import { getMapLocation } from '../../plugins/Geolocation'
import Members from '../Members/Members'
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
    }
    groupSelectEvent = (group) => {
        this.setState({ selectedGroup: group });
    }
    groups = () => {
        let listOfGroups = []
        if (this.state.groups.length > 0) {
            listOfGroups = this.state.groups.map(group => {
                return <Group selectGroup={this.groupSelectEvent} admin='true' group={group} />;
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
    handleOpen = (event) =>{
        event.preventDefault();
        window.location.href = document.location.origin + '/groups/create'
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
                        <Members back={this.deselectGroup} activeGroup={this.state.selectedGroup}></Members>
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