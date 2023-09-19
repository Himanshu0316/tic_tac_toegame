import React, { useEffect, useState } from 'react'
import styles from '../style/Play.module.css';
import { useParams } from 'react-router';
 import Chat from './chat/Chat';
 import Board from './board/Board';
import io from 'socket.io-client'
let socket;
const Play = () => {
  const { room_id } = useParams();
  const [socketHasBeenInitialized, setSocketHasBeenInitialized] = useState(false)
  const [playNow, setPlayNow] = useState(false);
  const url = `http://localhost:5000/`
  useEffect(() => {
      socket = io(url, {transports: ['polling']});
      setSocketHasBeenInitialized(true);
      socket.emit('join' , room_id );
      console.log("sss",room_id);

  }, [url])  
  useEffect(() => {
    socket.on('youCanPLayNow' , ()=>{
        // console.log('YouCanPLayNow');
        setPlayNow(true);
        console.log("gg",playNow)
    })  
    console.log("ggs",playNow)
},[])
//console.log("ggs",playNow)
  return ( playNow && socketHasBeenInitialized)?(

    <div className={styles.Welcome}>
        <div className={styles.gameBox}>
              <Board socket={socket} room_id={room_id?room_id:''} />
            </div>
            <div className={styles.gameBox}>
            <Chat socket={socket} room_id={room_id?room_id:''} />
            </div>
    </div>
  ) : (
    <div>loading...</div>
  )
}

export default Play