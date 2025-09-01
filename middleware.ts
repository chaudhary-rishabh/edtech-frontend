import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
        
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

// Specify which routes should be protected
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/dsa/:path*',
        '/purchased-courses/:path*',
    ]
}