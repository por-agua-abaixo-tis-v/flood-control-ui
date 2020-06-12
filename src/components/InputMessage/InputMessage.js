import React from 'react'
import classes from './InputMessage.css'
import axios from '../../axios-orders'
import { v4 as uuidv4 } from 'uuid';

async function retry(url, options, maximumRetry = 0, attempt = 0, delay = 3000) {
    try {
      await sleep(delay);
      const { data } = await axios.request({ url, ...options });
  
      return data;
    } catch (e) {
      if (attempt >= maximumRetry) throw e;
  
      return retry(url, options, attempt + 1, (delay || 1000) * 2);
    }
  };
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const InputMessage = (props) => {
    const sendMethod = (event) => {
        event.preventDefault();
        if (document.getElementById('input-message') && document.getElementById('input-message').value !== "") {
            axios.post('https://tisv-flood-control-api.herokuapp.com/messages?group_id=' + props.groupId + '&user_id=' + localStorage.getItem('id'), { "text": document.getElementById('input-message').value, "request_id": uuidv4() })
                .then(response => {
                    document.getElementById('input-message').value = ''
                    props.attMessage()
                })
                .catch( async error => {
                    retry('https://tisv-flood-control-api.herokuapp.com/messages?group_id=' + props.groupId + '&user_id=' + localStorage.getItem('id'), {
                        data: { "text": document.getElementById('input-message').value, "request_id": uuidv4() },
                        method: 'POST',
                      }, 3);
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