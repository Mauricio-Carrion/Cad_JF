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

  const options = {
    method: 'GET',
    url: `${remoteHost}/logs`,
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    setLoading(true)
    axios(options)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    setLoading(false)
  }, [])

  console.log(data)

  return (
    loading ? <Loading /> : <p>teste</p>

  )
}

export default Logs