import React from 'react';
import { PencilIcon, XCircleIcon } from '@heroicons/react/24/solid'
import './TrUser.css'

const TrUser = (props) => {
  return (
    <tr>
      <td>{props.code}</td>
      <td className='none'>{props.userName}</td>
      <td>{props.name}</td>
      <td className='none'>{props.lastName}</td>
      <td className='none'>{props.admin}</td>
      <td>
        <PencilIcon className='tdEditUserIcon' />
        <XCircleIcon className='tdDeleteUserIcon' />
      </td>
    </tr>
  )
}

export default TrUser