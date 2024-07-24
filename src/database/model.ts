import { Schema, Types, model, models } from "mongoose";

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

// ------------------------------

export interface IUser {
  _id: string;
  user: string;
  name: string;
  content: string;
}

const PlanSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "user" },
    name: String,
    content: String,
  },
  { timestamps: true }
);

export const PlanModel = models.plan || model<IUser>("plan", PlanSchema);
