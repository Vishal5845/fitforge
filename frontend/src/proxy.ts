import { withAuth } from "next-auth/middleware";

export default withAuth(() => {}, {
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/nutrition/:path*",
    "/workout/:path*",
    "/progress/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};