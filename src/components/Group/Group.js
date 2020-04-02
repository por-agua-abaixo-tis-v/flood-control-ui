import React from 'react'
import Template from '../../hoc/Template/Template'
import classes from './Group.css'
export const Group = (props) => {
    const hasName = (group) =>{
            if (group && group.name) {
                const partsOfName = group.name.split(' ')
                const lettersOfParts = partsOfName.map((part) => { return part.charAt(0)})
                const reducedName = lettersOfParts.join('')
                return reducedName.toUpperCase();
            } else {
            return ''
        }
    }
    return(
        <Template>
            <button onClick={() =>{props.selectGroup(props.group)}} className={classes.group}>
                <div className={classes.img}>
                    {hasName(props.group)}
                </div>
                <div>
                    <div className={classes.nameOfGroup}>
                        {props.group && props.group.name? props.group.name : '' }
                    </div>
                    <div className={classes.lastMessage}>
                    </div>
                </div>
            </button>
        </Template>
    )
}