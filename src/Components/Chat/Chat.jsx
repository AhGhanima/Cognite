import './Chat.css';import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import { useLocation } from 'react-router-dom'; 

function Chat({ socket }) {
  let { friendName } = useParams();
  const location = useLocation();
  const [roomName, setRoomName] = useState(null);
  const [message, setMessage] = useState('');
  const [displayedMessages, setDisplayedMessages] = useState([]);
  
  const getMessages = async () => {
      if (friendName) {
          let messagesDB = JSON.parse(localStorage.getItem("messages"));
          if (messagesDB) {
              const filteredMsgs = messagesDB.filter(a => a.target === friendName.toLowerCase());
              setDisplayedMessages([...filteredMsgs]);
            }
        }
    }
    
    const joinRoom = () => {
        let currentUser = getCurrentUser();
      socket.emit("joinRoom", {
          currentUser,
          target: friendName
      });

      socket.on('joinRoom', data => {
        setRoomName(data.room);
      });

      socket.on('message', data => {
          console.log(data);

          setDisplayedMessages( displayedMsgs => [data,...displayedMsgs]);
         
          const msgs = JSON.parse(localStorage.getItem("messages"));
          console.log(msgs);
          if (!msgs) {
              localStorage.setItem("messages", JSON.stringify([data]));
              return;
          } else {
          msgs.push(data);
          localStorage.setItem("messages", JSON.stringify(msgs));
          }
      });

  }

  const sendMessage = () => {
    if (message === '')
        return;
    let currentUser = getCurrentUser();
    socket.emit("sendMessage", 
    {
        roomName,
        currentUser,
        target: friendName,
        message
    });
    setMessage('');
  }

  const getCurrentUser = () => {
    return localStorage.getItem('name');
  }



useEffect(  () => {
    joinRoom();
    getMessages();
  }, [])

  useEffect(() => {
    getMessages();
    setMessage('');
  }, [location]);

  return (
      <>
            {friendName !== undefined && (
                <div className="card">
                <div className="card-body  d-flex flex-column">
                    <h5 className="card-title">{friendName}</h5>
                    {displayedMessages.map( (m,i) => <ChatMessage key={i} message={m.message} right={false} /> )}
                    <div className="card-footer mt-auto">
                        <div className="form-row">
                            <div className="col-md-11 mb-3">
                            <input type="text" className="form-control" placeholder="message..."  value={message} onChange={e => setMessage(e.target.value)} />
                            </div>
                            <div className="col-md-1 mb-3">
                            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>)
            }
        </>     
  );
}
export default Chat;
