import React, { useState, useContext, createContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import './SideHeader.css'
import CommonUserImg from '../../../assets/img/user.webp'
import { capitalize } from '../../../utils/utils'
import Modal from '../components/Modal';

export const MenuContext = createContext()

const SideHeader = () => {
  const { logout } = useContext(AuthContext)

  const [toggle, setToggle] = useState(false)
  const [OpenLogout, setOpenLogout] = useState(false)

  const handleToggle = () => {
    if (toggle) {
      setToggle(false)
    } else {
      setToggle(true)
    }
  }

  const userImage = JSON.parse(localStorage.getItem('user')).image
  const userName = capitalize(JSON.parse(localStorage.getItem('user')).userName)
  const lastName = capitalize(JSON.parse(localStorage.getItem('user')).lastName)

  return (
    <MenuContext.Provider value={handleToggle}>
      <aside className={`sideheader ${toggle ? 'sidebar-active' : ''}`}>
        <div className={`user ${toggle ? 'user-active' : ''}`}>
          <span className={`toggle ${toggle ? 'toggle-active' : ''}`} onClick={handleToggle}>
            <i className="fa fa-bars" aria-hidden="true" />
          </span>
          <img src={userImage ? userImage : CommonUserImg} alt="user-img" />
          <h5 className={`username ${toggle ? 'username-active' : ''}`}>
            {`${userName} ${lastName}`}
          </h5>
        </div>

        <nav className={`${toggle ? 'nav-active' : ''}`}>
          <NavLink className={`${toggle ? 'a-active' : ''}`} to="/dashboard">
            <i className="fa fa-area-chart" aria-hidden="true" />
            <p className={`${toggle ? 'p-active' : ''}`}>
              DashBoard
            </p>
          </NavLink>

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

          <NavLink className={`${toggle ? 'a-active' : ''}`} to="/logs">
            <i className="fa fa-archive" aria-hidden="true" />
            <p className={`${toggle ? 'p-active' : ''}`}>
              Logs
            </p>
          </NavLink>

          <a onClick={() => setOpenLogout(true)} className={`${toggle ? 'a-active' : ''}`}>
            <i className="fa fa-sign-out" aria-hidden="true" />
            <p className={`${toggle ? 'p-active' : ''}`}>
              Sair
              <Modal show={OpenLogout} close={OpenLogout}>
                <span>
                  Deseja realmente sair?
                </span>

                <div className="btns">
                  <button onClick={() => setOpenLogout(false)}>
                    <XMarkIcon className='heroicons' />
                  </button>

                  <button onClick={logout}>
                    <CheckIcon className='heroicons' />
                  </button>
                </div>
              </Modal>
            </p>
          </a>
        </nav>
      </aside>
    </MenuContext.Provider>
  )
}

export default SideHeader