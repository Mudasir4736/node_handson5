import React, { useState,useEffect } from 'react'
import classes from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import socketClient from 'socket.io-client'


function NavBar() {
  const [userName, setUserName]= useState('')
  const [roomName, setRoomNAme]= useState('')
  // const [sendFormData, setSendFormData]=useState(false)

  // const socket = socketClient('http://localhost:9090')

 const navi= useNavigate()
const handelName=(e)=>{
   setUserName(e.target.value)
}

const handleRoomName = (e)=>{
  setRoomNAme(e.target.value)
}

const handleSubmit=(e)=>{
   e.preventDefault()
  //  console.log("working");
  //  console.log( userName,roomName);
   if(userName==='' || roomName===''){
    alert('please enter valid User Name/Room Name')
    
  } else{
    navi('/chat-room', {state:{userName,roomName}}) 
    // setSendFormData(true)
   }
}

// useEffect(()=>{
//   // const socket = socketClient('http://localhost:9090')
 
//   socket.on('connect',()=>{
//     console.log('connected to server');
//   })
 

//   return()=>{
//     socket.disconnect()
//   }

// }, [])

// useEffect(()=>{
//   // console.log('inside second useEffect');
//   if(sendFormData){
//     console.log('inside if condition in second useEffect');
//     socket.emit('user_chat', {userName,roomName})
//     // console.log(formData);
//   }
// },[userName,roomName])

  return (
    <nav className={classes.mainCtn}>
      <div className={classes.subCtn}>
        <h2 className={classes.text}>ChatSocket</h2>
        <div className={classes.btn}>
          <form className={classes.form}>
             <input type='text' className={`${classes.input}`} placeholder='enter user name' name='userName' onChange={handelName}/>
             <input type='text'  className={`${classes.input}`}  placeholder='enter user room' name='roomName' onChange={handleRoomName}/>
             <button className={classes.enter} onClick={handleSubmit}>Enter Room</button>
             </form>
        </div>
        </div>
    </nav>
  )
}

export default NavBar