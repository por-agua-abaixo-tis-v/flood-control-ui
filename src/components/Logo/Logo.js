import React from 'react';


import classes from './Logo.css';

const logo = (props) => (
    <a href="/" className={classes.Logo} style={{height: props.height}}>
        Flood Control
    </a>
);

export default logo;