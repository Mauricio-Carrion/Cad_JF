import React from 'react'
import './Center.css'
import Background from './Background'
import Nav from './Nav'
import Content from './Content'

export default props =>
  <div className="center">
    <Background />
    <Nav />
    <Content />
  </div>