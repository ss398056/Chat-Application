import {Server} from 'socket.io';
import http from 'http';
import express from 'express'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

const userSocketMap = {
    //userId : socketId     
}

io.on("connection", (socket)=>{
    //console.log(socket.id)
    const userId = socket?.handshake?.query.userId;
    
    if(!userId) return;
    
    console.log(Object.keys(userSocketMap))

    userSocketMap[userId] = socket.id;

    io.emit("onlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        delete userSocketMap[userId];
        io.emit("onlineUsers",Object.keys(userSocketMap))
    })
})

const getSocketId = (userId)=>{
    return userSocketMap[userId];
}

export {io, app, server, getSocketId}
