import React from 'react'
import styles from '../../style/Board.module.css';
const Sqaure = ({ val , onClick }) => {
    return (
        <div>
            <button className={styles.Square} onClick={  onClick } >
                { val ? val :''}
            </button>
        </div>
    )
}

export default Sqaure;