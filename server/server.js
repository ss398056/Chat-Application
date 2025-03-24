
//Getting constant variable from .env file
import dotenv from 'dotenv'
dotenv.config()

import {app, server} from './socket/socket.js'

//Database Connect
import ConnectDB from './db/connection.db.js'
ConnectDB();

import cookieParser from 'cookie-parser';
app.use(cookieParser())

import cors from 'cors'
app.use(cors({
  origin: ["http://localhost:5173","https://chat-application-orcin-zeta.vercel.app"],
  credentials: true,
}));

//Create express app
import express from 'express'
app.use(express.json())

//User Routes
import userRoute from './routes/user.route.js'
app.use('/api/chat/app/v1/user',userRoute)

//Message Routes
import messageRoute from './routes/message.route.js';
app.use('/api/chat/app/v1/user/message',messageRoute)

//Middlewares
import { errorMiddleware } from './middlewares/error.middleware.js'
app.use(errorMiddleware)


const port = process.env.PORT || 5000;        //5000 used for local
server.listen(port, () => {
    console.log(`Your server working on port ${port}`)
  })