import React, { useEffect, useState } from "react"
import './EditClient.css'
import axios from "axios"
import remoteHost from "../../../../../../Api"
import Loading from "../../../../components/Loading"

const EditClient = () => {
  const params = window.location.search.split('=')[1]
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const token = JSON.parse(localStorage.getItem('user')).token

  const options = {
    method: 'GET',
    url: `${remoteHost}/cliente/${params}`,
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    axios(options)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    setLoading(false)
  }, [])

  return (
    <div className="editClient">
      {
        loading ? <Loading /> :
          <form className="clientForm">
            <input type="text" name="code" />
            <input type="text" name="name" />
            <input type="text" name="socialName" />
            <textarea name="obs">

            </textarea>
          </form>
      }
    </div>
  )
}

export default EditClient