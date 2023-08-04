import React, { useEffect, useState } from 'react'
import styles from './style/Home.module.css';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
const Home = () => {
  const { isAuth, userData } = useSelector((store) => store.auth);
  const [room_id, setRoom_id] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const joinRoom = async (e) => {
    e.preventDefault();

     var payload = {"room_id": room_id}
    axios.post(`/join_room`,payload ,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'    
      },
    })
      .then(res => {
        console.log(res);
        if (res.data.err) {
          setError(res.data.err);
        } else if (res.data.doc) {
          navigate('/play/' + room_id)
          console.log('bye');
        }
      });

  }

  //Programitically navigate Using React-Router-Dom
 // const navigate = useHistory()

  //Function to call server and get new Room id 
  const genereateUniqueID = () => {
    axios.get(`/create_room`).then(res => {
      navigate('/play/' + res.data)
    })
  }
  useEffect(() => {

  }, [])
  return (
    <div className={styles.Home}>

      {isAuth ?
        <div className={styles.Welcome}>

         <h1> Hello {userData.firstName} 😀</h1>
          <div className={styles.error} style={{ display: !error ? 'none' : 'flex' }} >{error}</div>
          
          <form onSubmit={joinRoom} id="room-form">
          <div className={styles.flexRoom}> 
            <input
            className={styles.Joinipt}
              type="text"
              value={room_id}
              onChange={e => { setError(''); setRoom_id(e.target.value) }}
              id="join Room"
              placeholder='Enter Room ID' />
            <button className={styles.Btnjoin}>Join Room</button>
            </div>
          </form>
          
          <div className={styles.Or}>OR</div>
          <button className={styles.Btncont} onClick={genereateUniqueID}>Create Room</button>


        </div>
        : <div className={styles.Welcomenot}>first login</div>}

    </div>
  )
}

export default Home