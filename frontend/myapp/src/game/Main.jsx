import React from 'react'
 import { auth } from '../firebase/config';
 import Navbar from './Navbar';
 import styles from './style/Main.module.css';
import Home from './Home';
import { Route, Routes } from 'react-router';
import Login from './Login';
import Play from './play/Play';
const Main = () => {
  
  return (
    <div className={styles.Main}>
      <Navbar/>
      <div >
      <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/Play/:room_id" element={<Play />} />
      </Routes>
      </div>
    </div>
  )
}

export default Main