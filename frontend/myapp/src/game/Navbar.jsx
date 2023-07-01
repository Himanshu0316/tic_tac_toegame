import React, { useState } from 'react'
import styles  from './style/Navbar.module.css'
import logo from '../assets/tttlogo.webp'
const Navbar = () => {
    const [isauth,setisauth] = useState(true)
  return (
    <div className={styles.Navbar}>
        <div className={styles.Logo}>
            <img className={styles.LogoImage} src={logo} alt="logo" srcset="" />
        </div>
        {isauth ? 
       <div className={styles.Loginbtn}>
             <button>Login</button>
             <p>|</p>
             <button>Signup</button>
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
    </div>
  )
}

export default Navbar