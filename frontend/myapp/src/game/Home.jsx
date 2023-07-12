import React, { useEffect, useState } from 'react'
import styles from './style/Home.module.css';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
const Home = () => {
    const { isAuth,userData } = useSelector((store) => store.auth);
    const [homes,setHomes] = useState(false)
    useEffect(()=>{

   },[])
  return (
    <div className={styles.Home}>
        {isAuth ? 
        <div className={styles.Welcome}>
            
        
        
        </div> 
        : <div className={styles.Welcomenot}>first login</div>}
        
    </div>
  )
}

export default Home