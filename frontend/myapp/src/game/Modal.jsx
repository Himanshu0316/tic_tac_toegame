import React, { useEffect, useState } from 'react'
import styles from './style/Modal.module.css';
import { AiFillCloseCircle } from "react-icons/ai";
import Login from './Login';
import Signup from './Signup';
const Modal = ({show,onClick,page,setPage}) => {
    
   //  const [open, setOpen] = useState(s);
   useEffect(()=>{

   },[])
  return (
    <div className={show ? styles.Popup : styles.Popupclose}>
    <div className={show ? styles.Modal : styles.Modalclose} >
      <AiFillCloseCircle onClick={onClick} className={styles.closeIcon}/>
           {page ? ( 
               <Login setPage={setPage}/>
           ): (
            <Signup setPage={setPage}/>
            )}

    </div>
    </div>
  )
}

export default Modal