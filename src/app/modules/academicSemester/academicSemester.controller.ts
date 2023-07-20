import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.Interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { academicSemesterFilterableField } from './academicSemester.constant';

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });
    next();
  },
);
const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.getSingleSemester(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester is retrived successfully',
      data: result,
    });
    next();
  },
);
const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };

    const filters = pick(req.query, academicSemesterFilterableField);

    const paginationOptions = pick(req.query, paginationFields);

    // console.log(paginationOptions);

    const result = await AcademicSemesterService.getAllsemester(
      filters,
      paginationOptions,
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester is retrived successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  },
);

const updateSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await AcademicSemesterService.updateSemester(
      id,
      updatedData,
    );
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester is updated successfully',
      data: result,
    });
    next();
  },
);

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester is deleted successfully',
    data: result,
  });
});
export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
