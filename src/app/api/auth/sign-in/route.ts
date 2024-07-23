import { UserModel } from "../../../../database/model";
import { connectDB } from "../../../../database/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();

  await connectDB();
  const found = await UserModel.findOne({
    email: res.email,
    password: res.password,
  });

  if (!found)
    return NextResponse.json({ message: "user not found!" }, { status: 404 });

  return NextResponse.json(found);
}
