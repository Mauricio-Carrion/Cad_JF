import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <aside className={`sideheader ${toggle ? 'nav-active' : ''}`}>
      <div className={`user ${!toggle ? 'user-active' : ''}`}>
        <span className={`toggle ${toggle ? 'toggle-active' : ''}`} onClick={handleToggle}>
          <i className="fa fa-bars" aria-hidden="true" />
        </span>
        <img src={userImg} alt="user-img" />
        <span className={`${!toggle ? 'username-active' : ''}`}>{`${userName} ${lastName}`}</span>
      </div>
      <nav className={`${toggle ? 'nav-active' : ''}`}>
        <Link className={`${toggle ? 'a-active' : ''}`} to="/users">
          <i className="fa fa-user" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Usuários
          </p>
        </Link>

        <Link className={`${toggle ? 'a-active' : ''}`} to="/clients">
          <i className="fa fa-users" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Clientes
          </p>
        </Link>

        <Link className={`${toggle ? 'a-active' : ''}`} to="/visits">
          <i className="fa fa-calendar" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Visitas
          </p>
        </Link>

        <Link className={`${toggle ? 'a-active' : ''}`} to="/reports">
          <i className="fa fa-area-chart" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Relatórios
          </p>
        </Link>

        <Link className={`${toggle ? 'a-active' : ''}`} to="/logs">
          <i className="fa fa-archive" aria-hidden="true" />
          <p className={`${toggle ? 'p-active' : ''}`}>
            Logs
          </p>
        </Link>

        <Link className={`${toggle ? 'a-active' : ''}`}>
          <Modal className={`${toggle ? 'p-active' : ''}`} />
        </Link>
      </nav>
    </aside>
  )
}

export default SideHeader