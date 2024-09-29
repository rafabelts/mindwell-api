import { User } from '../types/user';
import { CanBeNull } from '../types';

export class UserModel {
	protected id: string;
	protected name: string;
	protected email: string;
	protected photoUrl: CanBeNull<string>;
	protected isActive: boolean;
	protected isMember: boolean;

	constructor(userData: User) {
		(this.id = userData.id), (this.name = userData.name);
		this.email = userData.email;
		this.photoUrl = userData.photoUrl;
		this.isActive = userData.isActive;
		this.isMember = userData.isMember;
	}

	getData(): User {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			photoUrl: this.photoUrl,
			isActive: this.isActive,
			isMember: this.isMember,
		};
	}
}
