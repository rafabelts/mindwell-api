import { Chat } from '../types/chat';

export interface ChatRepositoryInterface {
	addChat: (userId: string, psychologistId: string) => void;

	addMessage: (content: string, senderId: string, chatId: number) => void;

	getMessages(chatId: number): Promise<Array<Chat>>;
}
