import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './users.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId, //mongoose theke _id ref
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId, //mongoose theke _id ref
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId, //mongoose theke _id ref
      ref: 'Admin',
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const User = model<IUser, UserModel>('User', UserSchema);
