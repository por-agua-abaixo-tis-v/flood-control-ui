import React from 'react'
import classes from './InputMessage.css'
import axios from '../../axios-orders'

const InputMessage = (props) => {
    const sendMethod = (value) => {
        axios.post( 'https://tisv-flood-control-api.herokuapp.com/messages?group_id=' + props.groupId+'&user_id='+props.user,{"text":document.getElementById('input-message').value})
        .then( response => {
            this.messages = response.data;
        } )
        .catch( error => {
        });
    }
        return (
            <div className={classes.inputForm}>
                <input id='input-message' type="text" className={classes.input} placeholder="Sua mensagem.."></input>
                <button className={classes.send} onClick={()=>{sendMethod()}}>Enviar</button>
            </div>
        )
}
export default InputMessage