import { UserModel } from "../../../../database/model";
import { connectDB } from "../../../../database/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();

  await connectDB();
  const found = await UserModel.findOne({
    email: res.email,
  });

  if (found)
    return NextResponse.json({ message: "email exists!" }, { status: 400 });

  const data = await UserModel.create({
    email: res.email,
    password: res.password,
  });

  return NextResponse.json(data);
}
