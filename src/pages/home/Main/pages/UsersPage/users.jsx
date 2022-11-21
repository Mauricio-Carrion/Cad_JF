import React from 'react'
import './Users.css'

const Users = () => {
  return (
    <div className="users">
      <table>
        <tr>
          <th>Código</th>
          <th>Usuário</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Admin</th>
          <th>Editar/Excluir</th>
        </tr>
      </table>
    </div>
  )
}

export default Users

