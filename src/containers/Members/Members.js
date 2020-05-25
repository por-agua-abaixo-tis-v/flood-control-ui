import React, { Component } from 'react'
import classes from './Members.css'
import axios from '../../axios-orders'
import Member from '../../components/Member/Member'
class Chat extends Component {

    state = {
        members: [],
        error: false,
    }
    componentDidMount = () =>{
        axios.get('https://tisv-flood-control-api.herokuapp.com/users')
        .then(response => {
            this.setState({ members: response.data });
        })
        .catch(error => {
            this.setState({ error: true });
        });
    }
    members = () =>{
        let listOfMembers = []
        if (this.state.members.length > 0) {
            listOfMembers = this.state.members.map(member => {
                return <Member member={member} />;
            })
                .reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
        }
        if (listOfMembers.length === 0) {
            return (<div></div>)
        }
        return listOfMembers
    }
    render() {
        this.groupId = this.props.activeGroup && this.props.activeGroup.id ? this.props.activeGroup.id : null
        return (
            <div className={classes.chat}>
                <div className={classes.title}>
                    <div className={classes.fs}>
                        {<img className={classes.img}></img>}
                        <div>
                            <div className={classes.titleUsers}>
                                Usuários Ativos
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.messages}>
                    {this.members()}
                </div>
            </div>
        )
    }
}
export default Chat;