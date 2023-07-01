import React from 'react'
 import { auth } from '../firebase/config';
 import Navbar from './Navbar';
 import styles from './style/Main.module.css';
const Main = () => {
  
  return (
    <div className={styles.Main}>
      <Navbar/>
      <h1 className={styles.h1Tag}>hiii</h1>
    </div>
  )
}

export default Main