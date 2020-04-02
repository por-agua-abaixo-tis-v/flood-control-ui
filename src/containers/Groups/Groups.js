import React, { Component } from 'react'
import Template from '../../hoc/Template/Template'
import axios from '../../axios-orders'
import { Group } from '../../components/Group/Group';
import Chat from '../../containers/Chat/Chat';
import classes from './Groups.css'
export default class Groups extends Component {
    state = {
        groups:[],
        error:false,
        selectedGroup:null
    }
    componentDidMount () {
    axios.get( 'https://tisv-flood-control-api.herokuapp.com/groups' )
        .then( response => {
            this.setState( { groups: response.data } );
        } )
        .catch( error => {
            this.setState( { error: true } );
        } );
    }
    groupSelectEvent = (group) => {
        this.setState( { selectedGroup: group } );
    }
    groups = ()=>{
        let listOfGroups = []
        if(this.state.groups.length > 0){
            listOfGroups = this.state.groups.map( group => {
                return <Group selectGroup={this.groupSelectEvent} group={group} />;
            } )
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);
        }
        return listOfGroups
    }
    render() {
        return (
            <Template>
                <div className={classes.chat}>
                <div>
                {this.groups()}
                </div>
                <div className={classes.flexGrow}>
                    <Chat activeGroup={this.state.selectedGroup}></Chat>
                </div>
                </div>
            </Template>
        )
    }
}
