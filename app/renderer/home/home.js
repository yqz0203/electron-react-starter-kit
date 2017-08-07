import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

import Login from './components/Login.jsx'
import Main from './components/Main.jsx'

import './home.css'

render(<Router>
    <div>
        <Redirect to='/login' />
        <Route path='/login' component={Login} />
        <Route path='/main' component={Main} />
    </div>
</Router>, document.querySelector('#root'))