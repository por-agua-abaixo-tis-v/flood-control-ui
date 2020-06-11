import React from 'react';
import floodLogo from '../../static/inundar.svg'

import classes from './Logo.css';

const logo = (props) => (
    <a href="/" className={classes.Logo} style={{height: props.height}}>
        <img src={floodLogo}></img>
        <span className={classes.LogoText}>Por Agua Abaixo</span>
    </a>
);

export default logo;