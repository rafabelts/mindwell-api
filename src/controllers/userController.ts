import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
	private userService: UserService;

	constructor(userService: UserService) {
		this.userService = userService;
	}

	async addUser(req: Request, res: Response) {
		try {
			const { type, userData } = req.body;

			if (!type) return res.status(400).json({ message: 'Type is required' });

			if (!userData)
				return res.status(400).json({ message: 'User data is required' });

			await this.userService.addUser(type, userData);

			return res.status(201).json({
				message: 'User created succesfully',
			});
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async getUserById(req: Request, res: Response) {
		try {
			const { id } = req.query;

			if (!id) return res.status(400).json({ message: 'Id is required' });

			const user = await this.userService.getUserById(id as string);

			if (user) return res.status(201).json({ message: user });
			else return res.status(400).json({ message: 'Not user found' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}

	async getAllUsers(req: Request, res: Response) {
		try {
			const { type } = req.params;

			if (!type) return res.status(400).json({ message: 'Type is required' });

			const users = await this.userService.getAllUsers(
				type as 'user' | 'psychologist' | 'institution'
			);

			if (users) return res.status(201).json({ message: users });
			else return res.status(400).json({ message: 'Users not found' });
		} catch (error) {
			res.status(400).json({ message: error });
		}
	}
}
