import { db } from '../config/db';
import { chat, message } from '../config/db/schema';
import { ChatRepositoryInterface } from '../interfaces/chatRepositoryInterface';
import { tryCatchHelper } from '../helpers/tryCatchHelper';

export class ChatRepository implements ChatRepositoryInterface {
	async addChat(userId: string, psychologistId: string) {
		return tryCatchHelper(async () => {
			if (!userId) throw new Error('User ID is missing');
			if (!psychologistId) throw new Error('Psychologist ID is missing');

			await db.insert(chat).values({
				userId: userId,
				psychologistId: psychologistId,
			});
		});
	}

	async addMessage(content: string, senderId: string, chatId: number) {
		return tryCatchHelper(async () => {
			if (!content) throw new Error('Content of the message is missing');
			if (!senderId) throw new Error('Sender ID is missing');
			if (!chatId) throw new Error('Chat ID is missing');

			await db.insert(message).values({
				content: content,
				senderId: senderId,
				chatId: chatId,
			});
		});
	}

	async getMessages(chatId: number) {
		return tryCatchHelper(async () => {
			if (!chatId) throw new Error('Chat ID is missing');

			const messages = await db.query.message.findMany({
				where: (model, { eq }) => eq(model.chatId, chatId),
			});

			if (!messages) throw new Error('No messages found');

			const messageWithUserName = await Promise.all(
				messages.map(async (message) => {
					const sender = await db.query.user.findFirst({
						where: (model, { eq }) => eq(model.id, message.senderId),
					});

					if (!sender) throw new Error('No sender found');

					return {
						content: message.content,
						date: message.date,
						senderName: sender.name,
					};
				})
			);

			return messageWithUserName;
		});
	}
}
