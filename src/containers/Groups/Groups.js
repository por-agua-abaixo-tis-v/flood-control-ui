import React, { Component } from 'react'
import Template from '../../hoc/Template/Template'
import axios from '../../axios-orders'
import { Group } from '../../components/Group/Group';
import Chat from '../../containers/Chat/Chat';
import classes from './Groups.css'
import { getMapLocation } from '../../plugins/Geolocation'
export default class Groups extends Component {
    state = {
        groups: [],
        error: false,
        selectedGroup: null
    }
    componentDidMount() {
        let position = getMapLocation()
        if (localStorage.getItem('id') == null) {
            window.location.href = window.location.origin + "/login"
        }
        axios.post('https://tisv-flood-control-api.herokuapp.com/users/' + localStorage.getItem('id') + '/geolocation', { 'latitude': position.latitude, 'longitude': position.longitude })
            .then(response => {
                axios.get('https://tisv-flood-control-api.herokuapp.com/users/' + localStorage.getItem('id') + '/groups')
                    .then(response => {
                        this.setState({ groups: response.data });
                    })
                    .catch(error => {
                        this.setState({ error: true });
                    });
            })
            .catch(error => {
                this.setState({ error: true });
            });
        setInterval(() => {
            let position = getMapLocation()
            axios.post('https://tisv-flood-control-api.herokuapp.com/users/' + localStorage.getItem('id') + '/geolocation', { 'latitude': position.latitude, 'longitude': position.latitude })
                .then(response => {
                    axios.get('https://tisv-flood-control-api.herokuapp.com/users/' + localStorage.getItem('id') + '/groups')
                        .then(response => {
                            this.setState({ groups: response.data });
                        })
                        .catch(error => {
                            this.setState({ error: true });
                        });
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
                return <Group selectGroup={this.groupSelectEvent} group={group} />;
            })
                .reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
        }
        return listOfGroups
    }
    deselectGroup = () => {
        this.setState({ selectedGroup: null });
    }
    render() {
        return (
            <Template>
                <div className={classes.chat}>
                    <div className={this.state.selectedGroup !== null ? classes.inactive : classes.active}>
                        {this.groups()}
                    </div>
                    <div className={this.state.selectedGroup !== null ? classes.flexGrow : classes.inactive}>
                        <Chat back={this.deselectGroup} activeGroup={this.state.selectedGroup}></Chat>
                    </div>
                </div>
            </Template>
        )
    }
}
