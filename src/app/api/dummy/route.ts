import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // 예시 더미 데이터
  const dummyData = {
    userId: 1,
    username: "dummyUser",
    email: "dummyuser@example.com",
  };
  // //body 값 받아오기
  // const data = await req.json();
  // //parameter값 받아오기
  // const searchParams = req.nextUrl.searchParams;
  // const query = searchParams.get("query");
  // console.log(data);
  // const token = req.cookies.get("token");
  // console.log(token);
  try {
    const text = await req.text();
    // Process the webhook payload
    // return new Response("성공!", {
    //   status: 200,
    // });
    return NextResponse.json(dummyData);
  } catch (error: any) {
    return new Response(`에러 발생!: ${error.message}`, {
      status: 400,
    });
  }
}
