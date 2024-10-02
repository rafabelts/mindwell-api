import { Router } from 'express';
import { ChatController } from '../controllers/chatController';
import { ChatService } from '../services/chatService';

const router = Router();

const chatController = new ChatController(new ChatService());

router.post('/', (req, res) => chatController.addChat(req, res));

router.get('/:id', (req, res) => chatController.getChats(req, res));

router.post('/message', chatController.addMessage.bind(chatController));

router.get('/message/:chatId', chatController.getMessages.bind(chatController));

export default router;
