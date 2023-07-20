import express from 'express';
//import { UserController } from './users.controller';
//import { UserValidation } from './user.validation';
import validateRequest from '../../middlewires/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
//import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
  //UserController.createUser,
);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.get('/', AcademicSemesterController.getAllSemesters);
//patch for multiple or single update && put for single update
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester,
);

router.delete('/:id', AcademicSemesterController.deleteSemester);
export const AcademicSemesterRouths = router;
