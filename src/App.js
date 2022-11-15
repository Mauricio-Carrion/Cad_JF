import React, { Component } from 'react';
import Routes from './Routes'
import 'font-awesome/css/font-awesome.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToastMessageError = (message) => {
  toast.error(`${message}`, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const showToastMessageSucess = (message) => {
  toast.success(`${message}`, {
    position: toast.POSITION.TOP_CENTER
  });
};
class App extends Component {
  render() {
    return (
      <>
        <Routes />
        <ToastContainer />
      </>
    );
  }
}

export default App