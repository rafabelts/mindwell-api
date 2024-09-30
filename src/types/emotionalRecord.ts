import { CanBeNull } from '.';

export interface Emotion {
	id: CanBeNull<number>;
	date: CanBeNull<string>;
	isActive: CanBeNull<boolean>;
	emotion: string;
	description: CanBeNull<string>;
	userId: string;
}
