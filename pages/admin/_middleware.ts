import { NextRequest, NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies['sb:token'];

  if (!token) return NextResponse.redirect('/top-albums', 302);

  const isValid = await jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);

  if (!isValid) return NextResponse.redirect('/top-albums', 302);

  return NextResponse.next();
}
