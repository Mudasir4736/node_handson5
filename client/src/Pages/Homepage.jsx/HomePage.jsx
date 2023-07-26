import React, { useEffect } from 'react'
import NavBar from '../../components/Navbar/NavBar'
import style from './HomePage.module.css'
import chat_pic from '../../static/chat_1.jpg'


function HomePage() {



  return (
    <>
        <NavBar/>
        <div className={style.home_ctn}>
          <div className={style.left}>
            <img className={style.homepage_img} src={chat_pic} alt="unavailable"/>
          </div>
         <div className={style.right}>
          <div className={style.cht_head}>ChatSocket - Connect and share moments with your loved ones, anytime, anywhere.</div>
          <div className={style.cht_sub}>Welcome to ChatSocket, the ultimate platform for engaging and meaningful conversations with your loved ones. Discover a space where you can freely gossip, share stories, and exchange ideas without any limitations.</div>
         </div>
        </div>
        </>
  )
}

export default HomePage

