import { NextRequest, NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';

export async function middleware(req: NextRequest) {
  const token = req.cookies['sb:token'];
  const url = '/top-albums';
  console.log({ token });
  if (!token) return NextResponse.redirect(url, 302);

  const isValid = await jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);
  console.log({ isValid });
  if (!isValid) return NextResponse.redirect(url, 302);

  return NextResponse.next();
}
