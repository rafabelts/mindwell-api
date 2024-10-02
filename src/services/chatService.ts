import { RepositoryFactory } from '../factories/repositoryFactory';
import { ChatRepositoryInterface } from '../interfaces/chatRepositoryInterface';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { PsychologistRepository } from '../repositories/psychologistRepository';
import { UserService } from './userService';

export class ChatService {
	private repository: ChatRepositoryInterface;

	constructor() {
		this.repository = RepositoryFactory.getRepository('chat');
	}

	async addChat(userId: string, psychologistId: string) {
		return tryCatchHelper(async () => {
			if (!userId) throw new Error('User ID is missing');
			if (!psychologistId) throw new Error('Psychologist ID is missing');

			const psychologistRepository = new PsychologistRepository();
			const psychologistData =
				psychologistRepository.getUserById(psychologistId);

			if (!psychologistData)
				throw new Error('Error. Psychologist ID not belongs to a psychologist');

			await this.repository.addChat(userId, psychologistId);
		});
	}

	async getChats(id: string) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('User ID is missing');

			const userService = new UserService();
			const userData = await userService.getUserById(id);

			if (!userData) throw new Error('User not found');

			if (userData.type !== 'user' && userData.type !== 'psychologist') {
				throw new Error('Invalid user type');
			}

			return this.repository.getChats(id, userData.type);
		});
	}

	async addMessage(content: string, senderId: string, chatId: number) {
		return tryCatchHelper(async () => {
			if (!content) throw new Error('Content of the message  is missing');
			if (!senderId) throw new Error('Sender ID is missing');
			if (!chatId) throw new Error('Chat ID is missing');

			await this.repository.addMessage(content, senderId, chatId);
		});
	}

	async getMessages(chatId: number) {
		return tryCatchHelper(async () => {
			if (!chatId) throw new Error('Chat ID is missing');

			const messages = await this.repository.getMessages(chatId);
			if (!messages) throw new Error('No messages found in the chat');

			return messages;
		});
	}
}
