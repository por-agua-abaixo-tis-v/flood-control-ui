import React from 'react'
import classes from './InputMessage.css'
import axios from '../../axios-orders'
import { v4 as uuidv4 } from 'uuid';


const InputMessage = (props) => {
    const sendMethod = (event) => {
        event.preventDefault();
        if (document.getElementById('input-message') && document.getElementById('input-message').value !== "") {
            axios.post('https://tisv-flood-control-api.herokuapp.com/messages?group_id=' + props.groupId + '&user_id=' + localStorage.getItem('id'), { "text": document.getElementById('input-message').value, "uuid": uuidv4() })
                .then(response => {
                    document.getElementById('input-message').value = ''
                    this.messages = response.data;
                    props.attMessage()
                })
                .catch(error => {
                });
        }
    }
    return (
        <form onSubmit={sendMethod} className={classes.inputForm}>
            <input id='input-message' type="text" className={classes.input} placeholder="Sua mensagem.."></input>
            <button disabled={!(document.getElementById('input-message') && !document.getElementById('input-message').value) === ""} className={classes.send}>Enviar</button>
        </form>
    )
}
export default InputMessage