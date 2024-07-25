import { PlanModel, UserModel } from "../../../database/model";
import { connectDB } from "../../../database/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();

  const userId = request.headers.get("authorization");
  const user = await UserModel.findById(userId);
  if (!user) {
    return NextResponse.json({ msg: "unauth" }, { status: 401 });
  }

  const data = await PlanModel.find({ user: userId });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  await connectDB();

  const userId = request.headers.get("authorization");
  const user = await UserModel.findById(userId);
  if (!user) {
    return NextResponse.json({ msg: "unauth" }, { status: 401 });
  }

  const data = await PlanModel.create({ ...res, user: userId });

  return NextResponse.json(data);
}
