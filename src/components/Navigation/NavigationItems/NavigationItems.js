import React, { Component } from 'react';
import Template from '../../../hoc/Template/Template'
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

class navigationItems extends Component {
    hasActive = (route) =>{
        return document.URL.includes(route)? true : false
    }
    render() {
        return(
            <Template>
                <ul className={classes.NavigationItems}>
                    <NavigationItem active={this.hasActive('groups')} link="/groups">Alertas</NavigationItem>
                    <NavigationItem active={this.hasActive('perfil')} link="/perfil">Perfil</NavigationItem>
                </ul>
            </Template>
        );
    }
}
export default navigationItems;