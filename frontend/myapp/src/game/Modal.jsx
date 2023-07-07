import React, { useEffect, useState } from 'react'
import styles from './style/Modal.module.css';
import { AiFillCloseCircle } from "react-icons/ai";
import Login from './Login';
import Signup from './Signup';
const Modal = ({setShow,show,onClick,page,setPage}) => {
  const [successful, setSuccessful] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  useEffect(() => {
    if (successful) {
      setTimeout(() => {
        setShow(false)
        setSuccessful(false);
      }, 3000);
    }
  }, [successful]);
   //const [open, setOpen] = useState(s);
   useEffect(()=>{

   },[])
  return (
    <div className={show ? styles.Popup : styles.Popupclose}>
    <div className={show ? styles.Modal : styles.Modalclose} >
      <AiFillCloseCircle onClick={onClick} className={styles.closeIcon}/>
           {page ? ( 
               <Login 
               setPage={setPage}
               initialRef={initialRef}
               finalRef={finalRef}
               setSuccessful={setSuccessful}
               />
           ): (
            <Signup 
            setPage={setPage}
            initialRef={initialRef}
            finalRef={finalRef}
            setSuccessful={setSuccessful}
            />
            )}

    </div>
    </div>
  )
}

export default Modal