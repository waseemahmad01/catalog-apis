import express from 'express';
import { auth, conversation, discount, uploads, messages } from '../../app';
const router = express.Router();

router.get('/conversation/:senderId/:receiverId', auth, conversation.index);

router.post('/conversation', auth, conversation.conversation);

router.get('/conversation/:id', auth, conversation.userId);

router.post('/messages', auth, messages.messages);

router.get('/messages/:id', auth, messages.index);


export default router;