import { auth } from "@/auth";

// Gate every page and file behind Google sign-in (allowlist in auth.ts).
export default auth((req) => {
  if (!req.auth) {
    const url = new URL("/api/auth/signin", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", req.nextUrl.href);
    return Response.redirect(url);
  }
});

export const config = {
  // Public (no sign-in): auth endpoints, static assets, and the L1 lesson.
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|course/l1-models-and-methodology).*)",
  ],
};
