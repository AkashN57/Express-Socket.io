// Imports
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors')
const {Server} = require('socket.io')

// HTTP Server
const server = http.createServer(app);
// Middleware
app.use(cors());
// Port
PORT = 3001

const io = new Server(server,{
        cors:{
            origin:"http://localhost:3000",
            methods : ["GET","POST"],
        },
})

// Listing to event
io.on('connection',(socket)=>{
    console.log(`User connected : ${socket.id}`)

    // Rooms
    // socket.on('join_room',(data)=>{
    //     socket.join(data)
    // })
    
    socket.on("send_message",(data)=>{
        // send message to everyone
        socket.broadcast.emit('recived_message',data)
        // socket.to(data.room).emit("recived_message",data)
    })
})

server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})