
//Getting constant variable from .env file
import dotenv from 'dotenv'
dotenv.config()

import {app, server} from './socket/socket.js'

//Database Connect
import ConnectDB from './db/connection.db.js'
ConnectDB();

import cookieParser from 'cookie-parser';
import cors from 'cors'

//Create express app
import express from 'express'

app.use(express.json())
app.use(cors({
  origin: [
    "https://chat-application-git-main-sandeeps-projects-cb877a64.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));


app.use(cookieParser())

//User Routes
import userRoute from './routes/user.route.js'
app.use('/api/chat/app/v1/user',userRoute)


//Message Routes
import messageRoute from './routes/message.route.js';
app.use('/api/chat/app/v1/user/message',messageRoute)

//Middlewares
import { errorMiddleware } from './middlewares/error.middleware.js'
app.use(errorMiddleware)


const port = process.env.PORT || 8080;        //5000 used for local
server.listen(port, () => {
    console.log(`Your server working on port ${port}`)
  })