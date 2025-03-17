import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/send/:receiverId', isAuthenticated, sendMessage);
router.get('/getmessages/:otherParticipantId', isAuthenticated, getMessages);

export default router;