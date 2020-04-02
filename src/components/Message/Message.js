import React from 'react'
import Template from '../../hoc/Template/Template'
import classes from './Message.css'
const Message = (props) => {
    const user = props && props.user && props.user[0].user? props.user[0].user : null
    const colorUser = props && props.user && props.user[0].color? props.user[0].color : null
    const message = props && props.messagem && props.messagem.text? props.messagem.text : null
    const actual = props && props.user[0].user && props.actual === props.user[0].user.toLowerCase()
        return (
            <Template>
                <div className={actual?classes.messageUser : classes.message}>
                    <span style={{color:colorUser}}>
                        {user}
                    </span>
                    <p className={classes.p}>
                        {message}
                    </p>
                </div>
            </Template>
        )
    }
export default Message
