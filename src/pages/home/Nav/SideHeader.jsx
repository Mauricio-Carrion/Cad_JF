import React from 'react';
import { Link } from 'react-router-dom';
import './SideHeader.css'
import userImg from '../../../assets/img/user.jpg'

const SideHeader = () => {
  return (
    <aside className="sideheader">
      <div className="user">
        <img src={userImg} alt="user-img" />
        <span>Mauricio Carrion</span>
      </div>
      <nav>
        <a href="/"><i class="fa fa-user" aria-hidden="true" />Usuários</a>
        <a href="/"><i class="fa fa-users" aria-hidden="true" />Clientes</a>
        <a href="/"><i class="fa fa-calendar" aria-hidden="true" />Visitas</a>
        <a href="/"><i class="fa fa-area-chart" aria-hidden="true" />Relatórios</a>
        <a href="/"><i class="fa fa-archive" aria-hidden="true" />Logs</a>
        <a href="/"><i class="fa fa-sign-out" aria-hidden="true" />Sair</a>
      </nav>
    </aside>
  )
}

export default SideHeader