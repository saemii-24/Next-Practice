import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();
    console.log(id, password);
    //비밀번호를 해싱한다.
    const hashedPassword = await bcrypt.hash(password, 12);
    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        id,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ message: "success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
