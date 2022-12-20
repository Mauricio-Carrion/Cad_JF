import React from 'react'
import './Visit.css'

const Visit = (props) => {
  return (
    <section className="visit">
      {props.children}
    </section>
  )
}

export default Visit