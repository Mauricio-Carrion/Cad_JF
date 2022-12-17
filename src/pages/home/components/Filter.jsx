import React from 'react'
import './Filter.css'

const Filter = (props) => {
  return (
    <div className="filter">
      {props.children}
    </div>
  )
}

export default Filter