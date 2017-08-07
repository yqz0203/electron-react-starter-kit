import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from '../../app/renderer/home/components/Login.jsx'

const setup = () => {
  let app = mount(
    <Router>
      <Main />
    </Router>
  )
  return {
    app
  }
}

describe('<Main />', () => {
  it('有登录标题', () => {
    const { app } = setup()
    expect(app.exists()).to.equal(true);
  });
});