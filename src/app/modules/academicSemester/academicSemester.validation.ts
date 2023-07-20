import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academicSemester.constant';
//req-validation using zod
//body--->object
//data---> object

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    // code: z.enum(['01', '02', '03']),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum(
      [...academicSemesterMonth] as [string, ...string[]],

      {
        required_error: 'Start month is required',
      },
    ),
    endMonth: z.enum(
      [...academicSemesterMonth] as [string, ...string[]],

      {
        required_error: 'End month is required',
      },
    ),
  }),
});

//ensure 1: route level: Update-->Give me title and code both, neither
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitle] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      // code: z.enum(['01', '02', '03']),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum(
          [...academicSemesterMonth] as [string, ...string[]],

          {
            required_error: 'Start month is needed',
          },
        )
        .optional(),
      endMonth: z
        .enum(
          [...academicSemesterMonth] as [string, ...string[]],

          {
            required_error: 'End month is required',
          },
        )
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    },
  );
export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};

//
