import { RepositoryFactory } from '../factories/repositoryFactory';
import { ChatRepositoryInterface } from '../interfaces/chatRepositoryInterface';
import { tryCatchHelper } from '../helpers/tryCatchHelper';

export class ChatService {
	private repository: ChatRepositoryInterface;

	constructor() {
		this.repository = RepositoryFactory.getRepository('chat');
	}

	async addChat(userId: string, psychologistId: string) {
		return tryCatchHelper(async () => {
			if (!userId) throw new Error('User ID is missing');
			if (!psychologistId) throw new Error('Psychologist ID is missing');

			await this.repository.addChat(userId, psychologistId);
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
