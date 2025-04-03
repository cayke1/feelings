export const dynamic = 'force-dynamic'; // Garante que o middleware roda sempre
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/register', '/privacy-policy', '/terms', '/forgot-password'];
const PROFESSIONAL_ROUTES = ['/dashboard'];
const PATIENT_ROUTES = ['/patient'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('access_token')?.value;
  const userRole = req.cookies.get('user_role')?.value;
  console.log('bateu no middleware')

  // Se for uma rota pública, deixa passar
  if (PUBLIC_ROUTES.includes(pathname)) {
    console.log('a')
    return NextResponse.next();
  }

  // Se não tiver token, manda pro login
  if (!accessToken || !userRole) {
    console.log('b')
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Verifica o acesso com base na role do usuário
  if (userRole === 'PROFESSIONAL' && PROFESSIONAL_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (userRole === 'PATIENT' && PATIENT_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Se não tiver acesso, redireciona para a home
  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }