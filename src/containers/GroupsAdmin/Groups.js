import React, { Component } from 'react'
import Template from '../../hoc/Template/Template'
import axios from '../../axios-orders'
import { Group } from '../../components/Group/Group';
import Chat from '../Chat/Chat';
import './Groups.scss'
export default class Groups extends Component {
    state = {
        groups: [],
        error: false,
        selectedGroup: null
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
                        <div className='groups-alert'><div>ALERTAS</div><button className='groups-new'>Novo Alerta</button></div>
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
