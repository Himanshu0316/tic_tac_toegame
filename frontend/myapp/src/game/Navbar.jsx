import React, { useEffect, useState } from 'react'
import styles  from './style/Navbar.module.css'
import logo from '../assets/tttlogo.webp'
import Modal from './Modal'
import { useSelector } from 'react-redux'
const Navbar = () => {
    //const [isauth,setisauth] = useState(true)
    const { isAuth } = useSelector((store) => store.auth);
    const [show,setShow] = useState(false)
    const [page,setPage] = useState(false)
    console.log(isAuth) 
    console.log("h") 
    useEffect(()=>{
           console.log(isAuth) 
    },[])
  return (
    <div className={styles.Navbar}>
        <div className={styles.Logo}>
            <img className={styles.LogoImage} src={logo} alt="logo" srcset="" />
        </div>
        {!isAuth ? 
       <div className={styles.Loginbtn}>
             <button onClick={()=>{setShow(true); setPage(true);} }>Login</button>
             <p>|</p>
             <button onClick={()=>{setShow(true); setPage(false);}}>Signup</button>
              </div>:
        <div className={styles.Logoutbtn}>
            <ul className={styles.ulD}>
                <li className={styles.liD}><div className={styles.Logout}>hi,Himanshu</div>
                    <ul className={styles.ulDd}>
                        <li className={styles.liDd}>
                        <button className={styles.Logout}>Logout</button>
                        </li>
                    </ul>
                </li>
            </ul>
             {/* <button>Logout</button> */}
        </div>
        }
        {/* {show ? */}
         {/* <div className={styles.Popup}> */}
        <Modal show={show} setShow={setShow} setPage={setPage} onClick={() => setShow(false)} page={page}/>
        {/* </div> */}
         {/* :""} */}

    </div>
  )
}

export default Navbar