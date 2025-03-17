import { asyncHandler } from "../utilities/async.handler.js";
import { errorHandler } from "../utilities/error.handler.js";
import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
import {getSocketId, io} from '../socket/socket.js'

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.userId;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fileds are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  //web socket impplementation
  const socketId = getSocketId(receiverId)
  io.to(socketId).emit("newMessage",newMessage)
  

  return res.status(200).json({
    success: true,
    message: "Message sent successfully",
    error: false,
    sentMessage: newMessage,
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const myId = req.userId;
  const otherParticipantId = req.params.otherParticipantId;

  if (!myId || !otherParticipantId) {
    return next(new errorHandler("All fileds are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId] },
  }).populate("messages");

  //web socket impplementation

  return res.status(200).json({
    success: true,
    message: "Got a conversation successfully.",
    error: false,
    conversation: conversation,
  });
});
