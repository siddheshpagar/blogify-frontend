import { NextResponse } from 'next/server';

// Middleware function
export function middleware(request) {
    const userToken = request.cookies.get("userToken")?.value;
    const adminToken = request.cookies.get("adminToken")?.value;

    const userPaths = ['/user/login', '/user/signup'];
    const adminPaths = ['/admin/login', '/admin/signup'];
    const isUserPath = userPaths.includes(request.nextUrl.pathname);
    const isAdminPath = adminPaths.includes(request.nextUrl.pathname);
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

    const redirectToLogin = (loginPath) => {
        const url = new URL(loginPath, request.url);
        url.searchParams.set('redirect', request.nextUrl.pathname); // Add redirect param
        return NextResponse.redirect(url);
    };

    // User logic
    if (isUserPath) {
        if (userToken) {
            console.log('Authenticated user attempting to access login/signup.');
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else if (!userToken && !isAdminRoute) {
        console.log('Unauthenticated user attempting to access secured route.');
        return redirectToLogin('/user/login');
    }

    // Admin logic
    if (isAdminPath) {
        if (adminToken) {
            console.log('Authenticated admin attempting to access login/signup.');
            return NextResponse.redirect(new URL('/admin/dashboard/users', request.url));
        }
    } else if (!adminToken && isAdminRoute) {
        console.log('Unauthenticated admin attempting to access secured admin route.');
        return redirectToLogin('/admin/login');
    }

    console.log(`Middleware: UserToken=${userToken}, AdminToken=${adminToken}`);
}

// Configuration for matching paths
export const config = {
    matcher: [
        '/user/:path*',
        '/admin/:path*',
        '/blog/:path*',
        '/',
    ],
};

// // import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export function middleware(request) {
//     // Get cookies from the request headers
//     // const cookies = request.cookies;    
//     // const cookieStore = cookies();
//     // const userToken = cookieStore.get('userToken')?.value;
//     // const adminToken = cookieStore.get('adminToken')?.value;

//     const userToken = request.cookies.get('userToken')?.value;
//     const adminToken = request.cookies.get('adminToken')?.value;
    
//     console.log("Middleware: userToken =>", userToken); // Check if token is being received

//     const userPaths = ['/user/login', '/user/signup'];
//     const adminPaths = ['/admin/login', '/admin/signup'];
//     const isUserPath = userPaths.includes(request.nextUrl.pathname);
//     const isAdminPath = adminPaths.includes(request.nextUrl.pathname);
//     const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

//     const redirectToLogin = (loginPath) => {
//         const url = new URL(loginPath, request.url);
//         url.searchParams.set('redirect', request.nextUrl.pathname);
//         return NextResponse.redirect(url);
//     };

//     // User logic
//     if (isUserPath) {
//         if (userToken) {
//             // console.log('Authenticated user attempting to access login/signup.');
//             return NextResponse.redirect(new URL('/', request.url));
//         }
//     } else if (!userToken && !isAdminRoute) {
//         // console.log('Unauthenticated user attempting to access secured route.');
//         return redirectToLogin('/user/login');
//     }

//     // Admin logic
//     if (isAdminPath) {
//         if (adminToken) {
//             // console.log('Authenticated admin attempting to access login/signup.');
//             return NextResponse.redirect(new URL('/admin/dashboard/users', request.url));
//         }
//     } else if (!adminToken && isAdminRoute) {
//         // console.log('Unauthenticated admin attempting to access secured admin route.');
//         return redirectToLogin('/admin/login');
//     }

//     // console.log(`Middleware: UserToken=${userToken}, AdminToken=${adminToken}`);
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/user/:path*', '/admin/:path*', '/blog/:path*', '/'],
// };
