import React from 'react'

import styles from '../../style/Chat.module.css';
const Msg = ({ message, user }) => {
    
    if (user.id === message.user_id) {
        return (
            <div className={`${styles.Row} ${styles.rightAlign}`}>
                <div className={styles.Right}>
                    <p className={styles.Sentbyme}>
                        {message.name}: {message.text}
                    </p>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${styles.Row} ${styles.leftAlign}`}>
                <div className={styles.Left}>
                    <p className={styles.Opponent}>
                        {message.name}: {message.text}
                    </p>
                </div>
            </div>
        )
    }

}

export default Msg