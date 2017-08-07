import React, { Component } from 'react'
import img from './img.png'

import './main.scss'

class Main extends Component {
    componentDidMount() {
        let myNotification = new Notification('登录成功', {
            body: '哈哈哈哈哈或或或或或或或或',
            icon: img
        })

        myNotification.onclick = () => {
            console.log('Notification clicked')
        }
    }

    render() {
        return (
            <div className="main" id="main">
                Welcome to HIS powered by Medlinker
            </div>
        )
    }
}

export default Main