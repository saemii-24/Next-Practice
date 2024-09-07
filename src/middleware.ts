import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token);

  // console.log("++++++++++++++++++++++++");
  // // console.log(token);
  // // console.log(new Date());
  // // console.log(req.cookies); // 쿠키를 확인하여 제대로 전송되는지 확인
  // const expTime = new Date((token?.exp as any) * 1000); // 만료 시간 (UTC)
  // const currentTime = new Date(); // 현재 시간 (UTC)
  // console.log(expTime);

  // console.log(currentTime);
  // console.log("++++++++++++++++++++++++");

  // if (currentTime >= expTime) {
  //   console.log("만료됨!");
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // } else {
  //   console.log("아직 유지 됨!");
  // }

  if (!token) {
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    // 로그아웃 처리 (NextAuth 로그아웃 API 호출)
    const response = NextResponse.redirect(new URL("/signin", req.url));
    console.log(response);

    // 클라이언트 쿠키 제거 (next-auth.session-token 정리)
    response.cookies.delete("next-auth.session-token");

    return response;
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: "/", // '/admin' 경로와 그 하위 경로에만 적용
};
