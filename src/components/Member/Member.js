import React, { Component } from 'react'
import classes from '../Member/Member.css'
import axios from '../../axios-orders'

export default class Member extends Component {
    deleteUser = () => {
        // eslint-disable-next-line no-restricted-globals
        let r = confirm("Deseja mesmo deletar este usuário?");
        if(r == true){
            axios.delete('https://tisv-flood-control-api.herokuapp.com/users/'+this.props.member.id)
            .then(response => {
                this.props.notification({
                    title: "Usuário Excluido com sucesso!",
                    type: "success",
                  })
                window.location.href = document.location.origin + '/groups'
                this.setState({ members: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
        }
    }
    render() {
        return (
            <div className={classes.title}>
                <div className={classes.fs}>
                    <div className={classes.member}>
                        <div className={classes.titleUsers}>
                            {this.props.member.name}
                        </div>
                        <div className={classes.descriptionUsers}>
                            {this.props.member.email}
                        </div>
                        <button disabled={localStorage.getItem('id') === this.props.member.id} onClick={this.deleteUser}>
                            Deletar Usuário
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
