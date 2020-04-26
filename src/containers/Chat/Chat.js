import React, { Component } from 'react'
import classes from '../Chat/Chat.css'
import axios from '../../axios-orders'
import Message from '../../components/Message/Message'
import { GroupTitle } from '../../components/Group/GroupTitle'
import InputMessage from '../../components/InputMessage/InputMessage'

class Chat extends Component {
    state = {
        messages: [],
        users:[],
        usersColors:[],
        error:false,
    }
    messages = []
    setUsers = () =>{
        let listOfUsers = this.state.users
        let ListOfUsersColors = this.state.usersColors
        this.messages.forEach((element)=>{
            if(!listOfUsers.includes(element.user)){
                listOfUsers.push(element.user)
                ListOfUsersColors.push({ user : element.user, color : this.getRandomColor()})
            }
        })
        if (this.state.users != listOfUsers) {
            this.setState( { users: listOfUsers,usersColors: ListOfUsersColors } );
        }
    }
    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color
    }
    messageInterval = () =>{
        if(this.groupId){
            axios.get( 'https://tisv-flood-control-api.herokuapp.com/messages?group_id='+ this.groupId)
                .then( response => {
                    this.messages = response.data;
                    this.createMessages()
                } )
                .catch( error => {
                    this.setState( { error: true } );
                });
            }
        }
    isCorrectUser=(value)=>{
        let correctUser =  this.state.usersColors.filter((element) =>{
            return element.user === value
        })
        return correctUser
    }
    createMessages = () =>{
        this.setUsers()
        let listOfMessage = []
        if(this.messages.length > 0){
            listOfMessage = this.messages.map( message => {
                return <Message user={this.isCorrectUser(message.user)} actual={localStorage.getItem('userName').toLowerCase()} messagem={message} />;
            } )
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);
        }
        if(this.state.messages !== listOfMessage){
            this.setState( { messages: listOfMessage } );
        }
    }
    render() {
        this.groupId = this.props.activeGroup && this.props.activeGroup.id? this.props.activeGroup.id : null
        setTimeout(() => {
            this.messageInterval()
        }, 10000);
        return (
            <div className={classes.chat}>
                <div className={this.props.activeGroup !== null? classes.active : classes.inactive}>
                <GroupTitle group={this.props.activeGroup} title={true} disabled></GroupTitle>
                </div>
                <div className={classes.messages}>
                    {this.state.messages}
                </div>
                <div className={this.props.activeGroup !== null? classes.active : classes.inactive}>
                <InputMessage groupId={this.groupId} user={localStorage.getItem('userName')}></InputMessage>
                </div>
            </div>
        )
    }
}
export default Chat;