import express from 'express';
import { UserRouths } from '../modules/users/users.route';
import { AcademicSemesterRouths } from '../modules/academicSemester/academicSemester.routh';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouths,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouths,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/users/', UserRouths);
// router.use('/academic-semesters/', AcademicSemesterRouths);

export default router;
