
import React, { useEffect, useState } from "react";
import style from "./chatroom.module.css";
import socketClient from 'socket.io-client'
import { useLocation } from "react-router-dom";

function ChatRoom() {
  const Location=useLocation()
  const [message, setMessage] = useState("");
  const [messageStore, setMessageStore] = useState([])
  const [socket, setSocket]= useState(null)
  const [oppUsers, setOppUsers] = useState("")
  const [oppUsersCollection, setOppUsersCollection] = useState([])

  const userName=Location.state.userName
  const roomName= Location.state.roomName
  
useEffect(()=>{
   const socket = socketClient('http://localhost:9090')
   setSocket(socket)
   return ()=>{
    if(socket){
    socket.disconnect()
    }
   }
},[])

  useEffect(()=>{
    if(socket){
    socket.emit('user_entered_chat',{userName,roomName})
  socket.on('chat_message',(val)=>{
console.log("recieved from server=>",val);
console.log(val.userName, userName);
if(val.userName!== userName && val.roomName===roomName){
  setOppUsersCollection([val.message])
  console.log(oppUsersCollection);
}
  })
    }
  },[socket, userName, roomName])



  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    console.log(message); 
    if(socket && message.trim() !== ""){
      const messageObj = {
              userName,
              roomName,
              message
      }
    socket.emit('chat_message', messageObj)
    setMessageStore([...messageStore, message])
    // console.log(messageStore);
    }
    setMessage("")
  };
  // const handleSubmit = () => {
  //   if (socket && message.trim() !== "") {
  //     const messageObj = {
  //       userName,
  //       roomName,
  //       message: message.trim(),
  //     };
  //     socket.emit('chat_message', messageObj);
  //     // setMessageStore([ messageObj]);
  //     setMessage("");
  //   }
  // };

//   console.log(messageStore);
  return (
    <div>
      <div className={style.cnt}>
        <div className={style.box}>
          <div className={style.top_header}>
          <h1 className={style.heading}>{roomName}</h1>
          <h3 className={style.name_heading}>{userName}</h3>
          </div>
          <div className={style.msg_cntnr}>
          {
            messageStore.map((item,index)=>{
                return(
                    
                    <div key={index} className={style.msg_display}>
                 { console.log(oppUsersCollection)}
                      <span>{item}</span>
                      </div>
                   
                )
            })
          }
    
</div>
          <div className={style.bottom}>
            <input
              type="text"
              className={style.input}
              placeholder="Type a message"
              onChange={handleMessage}
              name='message'
              value = {message}
            />
            <button className={style.btn} onClick={handleSubmit}>
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;