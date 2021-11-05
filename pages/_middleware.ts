import { NextRequest, NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';

import { ROUTES_ADMIN } from 'constants/index';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname !== '/signin') {
    return NextResponse.next();
  }

  const token = req.cookies['sb:token'];

  if (!token) {
    return NextResponse.next();
  }

  const isValid = await jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);

  if (isValid) {
    return NextResponse.redirect(ROUTES_ADMIN.base.href, 302);
  }

  return NextResponse.next();
}
