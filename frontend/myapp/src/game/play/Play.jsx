import React from 'react'
import styles from '../style/Play.module.css';
const Play = () => {
  return (
    <div className={styles.Welcome}>
        <div className={styles.gameBox}>
              <div className={styles.Users}>
                <p>You:<span>jjj</span></p>
                <p>Opponent:<span></span></p>
              </div>
            </div>
            <div className={styles.gameBox}></div>
    </div>
  )
}

export default Play