import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SideHeader.css'
import userImg from '../../../assets/img/user.jpg'
import Modal from '../Main/pages/LogoutModal/LogoutModal';
import { capitalize } from '../../../utils/utils'

const SideHeader = () => {
  const [toggle, setToggle] = useState(false)

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
    <aside className={`sideheader ${toggle ? 'sidebar-active' : ''}`}>
      <div className={`user ${toggle ? 'user-active' : ''}`}>
        <span className={`toggle ${toggle ? 'toggle-active' : ''}`} onClick={handleToggle}>
          <i className="fa fa-bars" aria-hidden="true" />
        </span>
        <img src={userImg} alt="user-img" />
        <h5 className={`username ${toggle ? 'username-active' : ''}`}>{`${userName} ${lastName}`}</h5>
      </div>
      <nav className={`${toggle ? 'nav-active' : ''}`}>
        <NavLink className={`${toggle ? 'a-active' : ''}`} to="/users">
          <i className="fa fa-user" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Usuários
          </p>
        </NavLink>

        <NavLink className={`${toggle ? 'a-active' : ''}`} to="/clients">
          <i className="fa fa-users" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Clientes
          </p>
        </NavLink>

        <NavLink className={`${toggle ? 'a-active' : ''}`} to="/visits">
          <i className="fa fa-calendar" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Visitas
          </p>
        </NavLink>

        <NavLink className={`${toggle ? 'a-active' : ''}`} to="/reports">
          <i className="fa fa-area-chart" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Relatórios
          </p>
        </NavLink>

        <NavLink className={`${toggle ? 'a-active' : ''}`} to="/logs">
          <i className="fa fa-archive" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Logs
          </p>
        </NavLink>

        <NavLink className={`${toggle ? 'a-active' : ''}`}>
          <Modal className={`${toggle ? 'p-active' : ''}`} />
        </NavLink>
      </nav>
    </aside>
  )
}

export default SideHeader