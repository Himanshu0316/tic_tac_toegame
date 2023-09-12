import React, { useEffect, useState } from 'react'
import styles from '../../style/Chat.module.css';
import { useSelector } from 'react-redux';
import Msg from './Msg';
const Chat = ({ socket, room_id }) => {
  const { userData } = useSelector((store) => store.auth);
  console.log(userData)
  const [message, setMessage] = useState('');
  //array to store message
  const [messages, setMessages] = useState([]);

  //function that sends message to server
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    //emit messsage to sokcet server
    const msg = {
      message,
      name: userData.firstName,
      user_id: userData._id,
      room_id
    };

    // console.log(msg);
    socket.emit('sendMessage', msg);
    setMessage('')
  }

  useEffect(() => {
    socket.on('messageReceived', message => {
      // console.log('Agya Agya Maal Agya',message);
      setMessages(msgs => [...msgs, message]);
    });
  }, [])
  return (
    <div className={styles.T}>Chat

      <div id='message-container' >
        {messages.map((message, i) => {
          return <Msg key={i} message={message} user={userData} />
        })}

      </div>


      <div>
        <form onSubmit={sendMessage} className="message-form">
          <input
            type="text" className="input-message" placeholder="Type A Message"
            value={message}
            onChange={e => { setMessage(e.target.value) }}
          />
          <button type="submit"  >Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat