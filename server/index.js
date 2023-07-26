const app = require('express')()
const http = require('http').Server(app)
const cors = require('cors')
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST',"PUT","OPTIONS"]
  }
})
const PORT = 4000



io.on('connection', (socket)=>{
  // console.log('connection in created....');
  let userName = '';
  let roomName = ''

  socket.on('user_entered_chat',(data)=>{
        userName = data.userName
        roomName = data.roomName
        // console.log(userName);
        const roomMsg = `${userName} joined ${roomName}`
    socket.join(roomName)
        // io.to(roomName).emit('chat_message',roomMsg)
        io.to(roomName).emit('user_entered_chat',roomMsg)
      })

  socket.on('chat_message',(newMsgs)=>{
 console.log(newMsgs);
 io.to(roomName).emit('chat_message',newMsgs)
  })

    socket.on('disconnect',()=>{
      const message = `${userName} has left the chat`
      socket.emit('diconnect',message)
    })    
 
})

app.get('/', (req, res) => {
    res.send('Server is up and running')
  })
  
  http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
  })