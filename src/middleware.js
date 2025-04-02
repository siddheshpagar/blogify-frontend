export function middleware(request) {
    const cookieHeader = request.headers.get('cookie') || '';
    const userToken = cookieHeader.split('; ').find(row => row.startsWith('userToken='))?.split('=')[1];
    const adminToken = cookieHeader.split('; ').find(row => row.startsWith('adminToken='))?.split('=')[1];

    console.log("Middleware: userToken =>", userToken); // Check if token is being received

    const userPaths = ['/user/login', '/user/signup'];
    const adminPaths = ['/admin/login', '/admin/signup'];
    const isUserPath = userPaths.includes(request.nextUrl.pathname);
    const isAdminPath = adminPaths.includes(request.nextUrl.pathname);
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

    const redirectToLogin = (loginPath) => {
        const url = new URL(loginPath, request.url);
        url.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    };

    // Redirect logic
    if (!userToken && !isAdminRoute) return redirectToLogin('/user/login');
    if (!adminToken && isAdminRoute) return redirectToLogin('/admin/login');

    return NextResponse.next();
}

export const config = {
    matcher: ['/user/:path*', '/admin/:path*', '/blog/:path*', '/'],
};
