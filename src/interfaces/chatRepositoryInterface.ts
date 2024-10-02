import { Chat, ChatData } from '../types/chat';

export interface ChatRepositoryInterface {
	addChat: (userId: string, psychologistId: string) => void;

	getChats: (
		userId: string,
		type: 'user' | 'psychologist'
	) => Promise<Array<ChatData>>;

	addMessage: (content: string, senderId: string, chatId: number) => void;

	getMessages(chatId: number): Promise<Array<Chat>>;
}
