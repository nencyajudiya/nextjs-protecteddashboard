// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('auth');
  console.log('🧹 Logged out, cookie cleared');
  return NextResponse.json({ ok: true });
}
