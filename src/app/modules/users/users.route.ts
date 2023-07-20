import express from 'express';
import { UserController } from './users.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewires/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent,
);

export const UserRouths = router;
