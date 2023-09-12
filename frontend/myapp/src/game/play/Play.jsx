import React, { useEffect, useState } from 'react'
import styles from '../style/Play.module.css';
import { useParams } from 'react-router';
 import Chat from './chat/Chat';
import io from 'socket.io-client'
// import Board from './tc-toe Board/Board'
let socket;
const Play = () => {
  const { room_id } = useParams();
  const [socketHasBeenInitialized, setSocketHasBeenInitialized] = useState(false)
  const [playNow, setPlayNow] = useState(false);
  const url = `http://localhost:5000/`
  useEffect(() => {
      socket = io(url, {transports: ['polling']});
      setSocketHasBeenInitialized(true);
      //return to if user doesn not exist means someone cam here from illegal way 
      // if (!user) {
      //     return;
      // }
      //emit join user event to server with below parmas 
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
              <div className={styles.Users}>
                <p>You:<span>jjj</span></p>
                <p>Opponent:<span>ggg</span></p>
              </div>
              {/* <Board socket={socket} room_id={room_id?room_id:''} /> */}
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