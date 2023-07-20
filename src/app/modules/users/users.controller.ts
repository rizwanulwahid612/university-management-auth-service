import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './users.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './users.interface';

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    });
    next();
  },
);
export const UserController = {
  createStudent,
};
