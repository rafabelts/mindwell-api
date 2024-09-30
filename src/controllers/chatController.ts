import { Request, Response } from 'express';
import { ChatService } from '../services/chatService';

export class ChatController {
	private chatService: ChatService;

	constructor(chatService: ChatService) {
		this.chatService = chatService;
	}

	async addChat(req: Request, res: Response) {
		try {
			const { userId, psychologistId } = req.query;

			if (!userId)
				return res.status(400).json({ message: 'User Id is missing' });
			if (!psychologistId)
				return res.status(400).json({ message: 'Psychologist Id is missing' });

			await this.chatService.addChat(
				userId as string,
				psychologistId as string
			);

			return res.status(201).json({ message: 'Chat added' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async addMessage(req: Request, res: Response) {
		try {
			const { content, senderId, chatId } = req.body;

			if (!content)
				return res
					.status(400)
					.json({ message: 'Content of the message is missing' });

			if (!senderId)
				return res.status(400).json({ message: 'Sender Id is missing' });

			if (!chatId)
				return res.status(400).json({ message: 'Chat Id is missing' });

			await this.chatService.addMessage(content, senderId, chatId);

			return res.status(201).json({ message: 'Message added' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async getMessages(req: Request, res: Response) {
		try {
			const { chatId } = req.params;

			if (!chatId)
				return res.status(400).json({ message: 'Chat Id is missing' });

			const parsedId = parseInt(chatId);

			if (isNaN(parsedId))
				return res.status(400).json({ message: 'Chat Id is invalid' });

			const messages = await this.chatService.getMessages(parsedId);

			return res.status(201).json({ message: messages });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}
}
