import React, { Component } from 'react'
import Template from '../../hoc/Template/Template'
import axios from '../../axios-orders'
import './Notices.scss'
import Notice from '../../components/Notice/Notice'
import { getMapLocation } from '../../plugins/Geolocation'
export default class Notices extends Component {
    state = {
        notices: [],
    }
    componentDidMount() {
        if (localStorage.getItem('id') == null) {
            window.location.href = window.location.origin + "/login"
        }
        axios.get('https://tisv-flood-control-api.herokuapp.com/twitter?num=10&user=defesacivilbh')
            .then(response => {
                this.setState({ notices: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }
    twitterNotices = () => {
        let notices = []
        if (this.state.notices.length > 0) {
            notices = this.state.notices.map(notice => {
                    return <Notice notice={notice} />;   
            })
                .reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
        }
        return notices
    }
    render() {
        return (
            <Template>
                <h1 className='message'>Noticias Recentes</h1>
                <div className='title'>
                    {this.twitterNotices()}
                </div>
            </Template>
        )
    }
}
