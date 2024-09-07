export default async function middleware(request) {
  const { headers } = request;
  const authToken = headers.get('Authorization');

  if (!authToken) {
    return NextResponse.rewrite(new URL('/[lng]/auth/login', request.url));
  }

  const user = await verifyToken(authToken);

  if (!user || user.role !== 'admin') {
    return NextResponse.rewrite(new URL('/[lng]/403', request.url));
  }

  return NextResponse.next();
}

// Mock function to verify token and get user info
async function verifyToken(token) {
  // Replace this with your actual token verification logic
  // and fetching user details from your database or auth service
  if (token === 'valid-admin-token') {
    return { role: 'admin' };
  }
  return null;
}

export const config = {
  matcher: [
    '/',
    '/account',
    '/attachment/:path*',
    '/attribute/:path*',
    '/auth/:path*',
    '/blog/:path*',
    '/category/:path*',
    '/checkout',
    '/commission_history',
    '/coupon/:path*',
    '/currency/:path*',
    '/dasboard',
    '/dashboard/:path*',
    '/faq/:path*',
    '/notification/:path*',
    '/order/:path*',
    '/page/:path*',
    '/payment_account/:path*',
    '/point/:path*',
    '/product/:path*',
    '/refund',
    '/review/:path*',
    '/role/',
    '/setting/:path*',
    '/shipping/:path*',
    '/store/:path*',
    '/tag/:path*',
    '/tax/:path*',
    '/theme/:path*',
    '/theme_option/:path*',
    '/user/:path*',
    '/vendore_wallet/:path*',
    '/wallet/:path*',
    '/withdraw_request/:path*',
    '/vendor_wallet/:path*',
    '/theme/denver',
    '/notifications',
    '/qna',
  ],
};
