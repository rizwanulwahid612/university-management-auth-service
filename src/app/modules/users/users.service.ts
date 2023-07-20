import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemister } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './users.interface';
import { User } from './users.model';
import { getGeneratedStudentId } from './users.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IAcademicSemester } from '../academicSemester/academicSemester.Interface';
//import { IAcademicSemester } from '../academicSemester/academicSemester.Interface';
//import { getGeneratedStudentId } from './users.utils';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  //set role
  user.role = 'student';

  const academicsemester = await AcademicSemister.findById(
    student.academicSemester,
  ).lean();
  //generet student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await getGeneratedStudentId(
      academicsemester as IAcademicSemester,
    );
    user.id = id;
    student.id = id;
    // Create student using sesssin
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    //set student _id into user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  //user--->ref-- student
  //student-->ref -->academicSem,academic Dep,academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
};
