import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';

const router = Router();

const userController = new UserController(new UserService());

router.post('/', userController.addUser.bind(userController));

router.get('/:id', userController.getUserById.bind(userController));

router.get('/all/:type', userController.getAllUsers.bind(userController));

export default router;
