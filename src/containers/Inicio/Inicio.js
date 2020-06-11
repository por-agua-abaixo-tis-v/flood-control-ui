import React, { Component } from 'react'
import './Inicio.scss'
import inundar from '../../static/inundar.svg'
import shield from '../../static/escudo.svg'
import alert from '../../static/sino.svg'
import internet from '../../static/internet.svg'

export default class Inicio extends Component {


    render() {
        return (
            <div className='container'>
                <div className='welcome'>
                <img className='icon' src={inundar}></img>
                    <h2>
                        Por água abaixo, o app que veio para sua segurança!
                    </h2>
                    <p> Por água abaixo é uma aplicação que por meio de alertas e noticias, te informa sobre alagamentos proxímos visando te alertas sobre possíveis perigos, além de possibilitar uma ajuda mútua das pessoas que estão no local através de um Chat.</p>
                </div>
                <div className='cards-box'>
                    <div className='card'>
                        <img className='icon' src={shield}></img>
                        <h2>Confíavel</h2>
                        <p>Todos os alertas antes de avisar nossos usúarios passam por uma pré aprovação de um administrador.</p>
                    </div>
                    <div className='card'>
                        <img className='icon' src={alert}></img>
                        <h2>Alertamos você</h2>
                        <p>Caso você esteja dentro do raio que o alagamentos pode atingir, você será inserido no alerta.</p>
                    </div>
                    <div className='card'>
                        <img className='icon' src={internet}></img>
                        <h2>Colaboração mutua</h2>
                        <p>Através do nosso chat, permitimos que os usuários que estão sendo atingidos pelo alerta, possam se ajudar.</p>
                    </div>
                </div>
            </div>
        )
    }
}
