import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../utils/validationSchemas.js';
import { UserController } from '../controller/index.js';

const router = Router();

router.get('/users', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.get('/:id/basic_info', UserController.getUserBasicInfo);
router.get('/:id/suggested_user', UserController.getRandomUsers);
router.post('/users', checkSchema(createUserValidationSchema), UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
