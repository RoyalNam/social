import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../utils/validationSchemas';
import { UserController } from '../controller';

const router = Router();

router.get('/api/users', UserController.getUsers);
router.get('/api/users/:id', UserController.getUserById);
router.get('/api/users/:id/basic_info', UserController.getUserBasicInfo);
router.get('/api/users/:id/suggested_user', UserController.getRandomUsers);
router.get('/api/users/:id/notifications', UserController.getNotifications);
router.post('/api/users', checkSchema(createUserValidationSchema), UserController.createUser);
router.put('/api/users/:id', UserController.updateUser);
router.delete('/api/users/:id', UserController.deleteUser);

export default router;
