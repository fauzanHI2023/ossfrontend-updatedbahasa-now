import {NextRequest} from 'next/server';
import {withAuth} from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Cek apakah path adalah /dashboard atau /{locale}/dashboard
const isDashboardPath = (pathname: string) => {
  const dashboardRegex = new RegExp(
    `^(/(${routing.locales.join('|')}))?/dashboard(/.*)?$`,
    'i'
  );
  return dashboardRegex.test(pathname);
};

const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({token}) => token != null
  },
  pages: {
    signIn: '/login'
  }
});

export default function middleware(req: NextRequest) {
  if (isDashboardPath(req.nextUrl.pathname)) {
    return (authMiddleware as any)(req);
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
