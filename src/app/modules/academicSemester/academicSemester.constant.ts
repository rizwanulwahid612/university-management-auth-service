import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
} from './academicSemester.Interface';

export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCodes: IAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];
export const academicSemesterMonth: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const academicSemesterSearchable = ['title', 'code', 'year'];

export const academicSemesterFilterableField = [
  'searchTerm',
  'title',
  'code',
  'year',
];
