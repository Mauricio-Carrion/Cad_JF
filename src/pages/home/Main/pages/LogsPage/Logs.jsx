import React, { useState, useEffect } from 'react';
import TrLog from './components/TrLog'
import { showToastMessageError, showToastMessageSucess } from '../../../../../App';
import Loading from '../../../components/Loading';
import axios from 'axios';
import remoteHost from '../../../../../Api';
import './Logs.css'

const Logs = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const token = JSON.parse(localStorage.getItem('user')).token

  const headers = {
    Authorization: `Bearer ${token}`
  }

  useEffect(async () =>
    await axios.get(`${remoteHost}/logs`, headers)
      .then(res => setData(res))
      .catch(err => console.log(err))
    , [])

  return (
    <p>teste</p>
  )
}

export default Logs