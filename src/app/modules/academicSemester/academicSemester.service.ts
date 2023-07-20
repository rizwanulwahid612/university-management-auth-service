import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.Interface';
import {
  academicSemesterSearchable,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import { AcademicSemister } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  //business logic check
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalide Semester Code');
  }
  const result = await AcademicSemister.create(payload);
  return result;
};
const getSingleSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemister.findById(id);
  return result;
};
const getAllsemester = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andconditions = [];
  if (searchTerm) {
    andconditions.push({
      $or: academicSemesterSearchable.map(field => ({
        [field]: {
          $regex: searchTerm, //search string
          $options: 'i', //case insensetive
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andconditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const andconditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm, //search string
  //           $options: 'i', //case insensetive
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  // const { page, limit, skip, sortBy, sortOrder } =
  //   paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andconditions.length > 0 ? { $and: andconditions } : {};

  const result = await AcademicSemister.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemister.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  //Ensure 2: Service level:Update---> Mapping title: code
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalide Semester Code');
  }

  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
//updateSemester;
//deleteSemester
const deleteSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemister.findByIdAndDelete(id);
  return result;
};
export const AcademicSemesterService = {
  createSemester,
  getAllsemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
