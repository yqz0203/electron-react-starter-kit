import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import Login from '../../app/renderer/home/components/Login.jsx'

const setup = () => {
  let app = mount(
    <Router>
      <Login />
    </Router>
  )
  return {
    app,
    login: app.find('.login')
  }
}

describe('<Login />', () => {
  it('有登录标题', () => {
    const { login } = setup()
    expect(login.contains(<h1>登录</h1>)).to.equal(true);
  });
});