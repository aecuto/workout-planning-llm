import { Schema, model, models } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  password: string;
}

const UserSchema = new Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
);

export const UserModel = models.user || model<IUser>("user", UserSchema);
