import React from 'react'
import './Visit.css'

const Visit = (props) => {
  return (
    <section className="visit">
      <span>
        <h4>{props.desc}</h4>
        <p>{props.obs}</p>
        <h6>{props.date}</h6>
      </span>
    </section>
  )
}

export default Visit