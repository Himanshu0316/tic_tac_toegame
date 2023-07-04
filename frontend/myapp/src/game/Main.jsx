import React from 'react'
 import { auth } from '../firebase/config';
 import Navbar from './Navbar';
 import styles from './style/Main.module.css';

const Main = () => {
  
  return (
    <div className={styles.Main}>
      <Navbar/>
      <div className={styles.Mainbox}>
      <h1 className={styles.h1Tag}>hiii</h1>
      <div>
        <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>
      </div>
      </div>
    </div>
  )
}

export default Main