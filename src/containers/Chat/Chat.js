import React, { Component } from 'react'
import classes from '../Chat/Chat.css'
import axios from '../../axios-orders'
import Message from '../../components/Message/Message'
import { GroupTitle } from '../../components/Group/GroupTitle'
import InputMessage from '../../components/InputMessage/InputMessage'
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
class Chat extends Component {

    state = {
        messages: [],
        users: [],
        usersColors: [],
        error: false,
    }

    messages = []
    setUsers = () => {
        let listOfUsers = this.state.users
        let ListOfUsersColors = this.state.usersColors
        this.messages.forEach((element) => {
            if (!listOfUsers.includes(element.user)) {
                listOfUsers.push(element.user)
                ListOfUsersColors.push({ user: element.user, color: this.getRandomColor() })
            }
        })
        if (this.state.users != listOfUsers) {
            this.setState({ users: listOfUsers, usersColors: ListOfUsersColors });
        }
    }
    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return this.colorLuminance(color, 1)
    }
    colorLuminance = (hex, lum) => {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;
        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        return rgb;
    }
    messageInterval = () => {
        if (this.groupId) {
            axios.get('https://tisv-flood-control-api.herokuapp.com/messages?group_id=' + this.groupId)
                .then(response => {
                    this.messages = response.data;
                    this.createMessages()
                })
                .catch(error => {
                    this.setState({ error: true });
                });
        }
    }
    isCorrectUser = (value) => {
        let correctUser = this.state.usersColors.filter((element) => {
            return element.user === value
        })
        return correctUser
    }
    createMessages = () => {
        this.setUsers()
        let listOfMessage = []
        if (this.messages.length > 0) {
            listOfMessage = this.messages.map(message => {
                return <Message user={this.isCorrectUser(message.user)} actual={localStorage.getItem('userName').toLowerCase()} messagem={message} />;
            })
                .reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
        }
        if (this.state.messages !== listOfMessage) {
            this.setState({ messages: listOfMessage });
        }
    }
    render() {
        this.groupId = this.props.activeGroup && this.props.activeGroup.id ? this.props.activeGroup.id : null
        setTimeout(() => {
            this.messageInterval()
        }, 10000);
        return (
            <div className={classes.chat}>
                <div className={this.props.activeGroup !== null ? classes.active : classes.inactive}>
                    <button onClick={this.props.back} className={classes.backButton}>
                        <ArrowBackIcon />
                    </button>
                    <GroupTitle group={this.props.activeGroup} title={true} disabled></GroupTitle>
                </div>
                <div className={classes.messages}>
                    {this.state.messages}
                </div>
                <div className={this.props.activeGroup !== null ? classes.active : classes.inactive}>
                    <InputMessage groupId={this.groupId} user={localStorage.getItem('userName')}></InputMessage>
                </div>
            </div>
        )
    }
}
export default Chat;