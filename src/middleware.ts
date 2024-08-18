import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // JWT 토큰에서 사용자 정보를 가져옴
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 요청된 URL을 가져옴
  const { pathname } = req.nextUrl;

  // 'admin' 페이지 접근 제어
  if (pathname.startsWith("/admin")) {
    // 토큰이 없거나 역할이 'master'가 아닌 경우
    if (!token || token.role !== "master") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 접근 제어 통과 시 요청을 다음 핸들러로 전달
  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: "/admin/:path*", // '/admin' 경로와 그 하위 경로에만 적용
};
