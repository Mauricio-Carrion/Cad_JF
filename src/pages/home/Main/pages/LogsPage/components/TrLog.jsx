import React from 'react';
import './TrLog.css'

const TrLog = (props) => {
  return (
    <tr>
      <td>{props.code}</td>
      <td>{props.type}</td>
      <td>{props.user}</td>
      <td>{props.date}</td>
    </tr>
  )
}

export default TrLog