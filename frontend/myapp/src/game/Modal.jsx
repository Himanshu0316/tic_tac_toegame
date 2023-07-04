import React, { useState } from 'react'
import styles from './style/Modal.module.css';
const Modal = ({show,onClick}) => {

    //const [open, setOpen] = useState(show);
   
  return (
    <div className={show ? styles.Popup : styles.Popupclose}>
    <div className={show ? styles.Modal : styles.Modalclose} onClick={onClick}>
           hiii
    </div>
    </div>
  )
}

export default Modal