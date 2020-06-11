import React, { Component } from 'react'
import Template from '../../hoc/Template/Template'
import axios from '../../axios-orders'
import { Group } from '../../components/Group/Group';
import Chat from '../../containers/Chat/Chat';
import './Groups.scss'
import { getMapLocation } from '../../plugins/Geolocation'
import canecaFeliz from '../../static/caneca.svg'
import { v4 as uuidv4 } from 'uuid';
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
        axios.post('https://tisv-flood-control-api.herokuapp.com/users/' + localStorage.getItem('id') + '/geolocation', { 'latitude': position.latitude, 'longitude': position.longitude, 'uuid': uuidv4()})
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
            axios.post('https://tisv-flood-control-api.herokuapp.com/users/' + localStorage.getItem('id') + '/geolocation', { 'latitude': position.latitude, 'longitude': position.latitude, 'uuid': uuidv4()})
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
        }, 10000);
    }
    groupSelectEvent = (group) => {
        this.setState({ selectedGroup: group });
    }
    groups = () => {
        let listOfGroups = []
        if (this.state.groups.length > 0) {
            listOfGroups = this.state.groups.map(group => {
                if (group.active) {
                    return <Group selectGroup={this.groupSelectEvent} group={group} />;   
                }
            })
                .reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
        }
        if (listOfGroups.length === 0 || listOfGroups[0] === undefined) {
            return (<div className='message'><img className='caneca' src={canecaFeliz}></img> <span>Parece que nenhum alerta foi encontrado, que bom!</span></div>)
        }
        return listOfGroups
    }
    deselectGroup = () => {
        this.setState({ selectedGroup: null });
    }
    render() {
        if (localStorage.getItem('messageRedirect') === 'true') {
            setTimeout(() => {
                this.props.notification({
                  title: "Erro de Permissão",
                  msg: "Você precisa estar logado como administrador para acessar está pagina",
                  type: "error"
                })
              }, 1000);
              localStorage.removeItem('messageRedirect')
            }
        return (
            <Template>
                <div className='chat'>
                    <div className={this.state.selectedGroup !== null ? 'inactive groups-box' : 'active groups-box'}>
                        <div className='groups-alert'>ALERTAS</div>
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
