import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.Interface';
import {
  academicSemesterCodes,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      // enum: ['01', '02', '03']
      enum: academicSemesterCodes,
    },
    startMonth: { type: String, required: true, enum: academicSemesterMonth },
    endMonth: { type: String, required: true, enum: academicSemesterMonth },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

//akti user er same content at a time does not exit same year e same title 2nd time exicution hobe na, so use pre hook
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semister is already exist !');
  }
  next();
});

export const AcademicSemister = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);
