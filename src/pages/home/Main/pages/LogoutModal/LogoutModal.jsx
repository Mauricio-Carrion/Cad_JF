import React, { Component } from 'react';
import ReactModal from 'react-modal'
import './LogoutModal.css'
import { AuthContext } from '../../../../../contexts/auth';

ReactModal.setAppElement('#root');

class Modal extends Component {
  static contextType = AuthContext

  state = { showModal: false }

  handleOpenModal = () => {
    this.setState({ showModal: true })
    console.log(this.state)
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div>
        <span onClick={this.handleOpenModal}>
          <p className={this.props.className}>Sair</p>
        </span>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Modal"
          className='modal'
          ariaHideApp={false}
          overlayClassName='modaloverlay'>
          <div>
            Deseja realmente sair?
          </div>

          <div className='btns'>
            <span onClick={this.handleCloseModal}><i className="fa fa-times" aria-hidden="true" /></span>
            <span onClick={this.context.logout}><i className="fa fa-check" aria-hidden="true" /></span>
          </div>
        </ReactModal>
      </div >
    )
  }
}

export default Modal