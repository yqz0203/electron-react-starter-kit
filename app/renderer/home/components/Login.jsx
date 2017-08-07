import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
    render() {
        return (
            <div className="login" id="login">
                <h1>登录</h1>
                <div>
                    <label>用户名</label>
                    <input type="text" name="" value="" id="username" />
                </div>
                <div>
                    <label>密码</label>
                    <input type="text" name="" value="" />
                </div>
                <Link to='/main'>
                    <button type="button" id="btn">登录</button>
                </Link>
            </div>
        );
    }
}

export default Login