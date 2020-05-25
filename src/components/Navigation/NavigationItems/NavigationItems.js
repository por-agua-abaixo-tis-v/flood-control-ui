import React, { Component } from 'react';
import Template from '../../../hoc/Template/Template'
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import navItemCss from './NavigationItem/NavigationItem.css';

class navigationItems extends Component {
    hasActive = (route) =>{
        return document.URL.includes(route)? true : false
    }
    logout = () => {
        localStorage.removeItem('id')
    }
    hasLoggedNavbar = () => {
        if (localStorage.getItem('id')) {
            const navItems = localStorage.getItem('adm') === "true" ? [
            <NavigationItem active={this.hasActive('groups/admin')} link="/groups/admin">Admin</NavigationItem>,
            <NavigationItem active={this.hasActive('groups')} link="/groups">Alertas</NavigationItem>
        ] : [
            <NavigationItem active={this.hasActive('groups')} link="/groups">Alertas</NavigationItem>
        ]
            return [...navItems,
            <li className={navItemCss.NavigationItem}>
                <a NavigationItem
                onClick={()=>{this.logout()}}
                href="/login"
                >Logout</a>
            </li>
        ]
        } else {
            return [<NavigationItem active={this.hasActive('login')} link="/login">Entrar</NavigationItem>,
                   <NavigationItem active={this.hasActive('register')} link="/register">Registrar</NavigationItem>]
        }
    }
    render() {
        return(
            <Template>
                <ul className={classes.NavigationItems}>
                    {this.hasLoggedNavbar()}
                </ul>
            </Template>
        );
    }
}
export default navigationItems;