import React from 'react'
import Template from '../../hoc/Template/Template'
import classes from './Group.css'
import alert from '../../static/alert.svg'

export const GroupTitle = (props) => {
    const hasName = (group) => {
        if (group && group.name) {
            const partsOfName = group.name.split(' ')
            const lettersOfParts = partsOfName.map((part) => { return part.charAt(0) })
            const reducedName = lettersOfParts.join('')
            return reducedName.toUpperCase();
        } else {
            return ''
        }
    }
    return (
        <Template>
            <div className={classes.title}>
                <div className={classes.fs}>
                    <img className={classes.img} src={alert}></img>
                    <div>
                        <div className={classes.nameOfGroupTitle}>
                            {props.group && props.group.name ? props.group.name : ''}
                        </div>
                    </div>
                </div>
            </div>
        </Template >
    )
}