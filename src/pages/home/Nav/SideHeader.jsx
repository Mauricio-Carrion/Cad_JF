import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideHeader.css'
import userImg from '../../../assets/img/user.jpg'
import Modal from '../Main/pages/LogoutModal/LogoutModal';
import { capitalize } from '../../../utils/utils'

const SideHeader = () => {
  const [toggle, setToggle] = useState(true)

  const handleToggle = () => {
    if (toggle) {
      setToggle(false)
    } else {
      setToggle(true)
    }
  }

  const userName = capitalize(JSON.parse(localStorage.getItem('user')).userName)
  const lastName = capitalize(JSON.parse(localStorage.getItem('user')).lastName)

  return (
    <aside className={`sideheader ${toggle ? 'nav-active' : ''}`}>
      <span className="toggle" onClick={handleToggle}>
        <i className="fa fa-bars" aria-hidden="true" />
      </span>

      <div className={`user ${!toggle ? 'user-active' : ''}`}>
        <img src={userImg} alt="user-img" />
        <span className={`${!toggle ? 'user-active' : ''}`}>{`${userName} ${lastName}`}</span>
      </div>
      <nav>
        <Link to="/users"><i className="fa fa-user" aria-hidden="true" />Usuários</Link>
        <Link to="/clients"><i className="fa fa-users" aria-hidden="true" />Clientes</Link>
        <Link to="/visits"><i className="fa fa-calendar" aria-hidden="true" />Visitas</Link>
        <Link to="/reports"><i className="fa fa-area-chart" aria-hidden="true" />Relatórios</Link>
        <Link to="/logs"><i className="fa fa-archive" aria-hidden="true" />Logs</Link>
        <Link><Modal /></Link>
      </nav>
    </aside>
  )
}

export default SideHeader