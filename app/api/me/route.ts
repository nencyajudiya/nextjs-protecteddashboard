// app/api/me/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth');

    if (!authCookie?.value) {
      return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
    }

    const decoded = Buffer.from(authCookie.value, 'base64').toString('utf-8');
    const user = JSON.parse(decoded);

    console.log('✅ /api/me user ->', user);

    return NextResponse.json({ user });
  } catch (error) {
    console.error('❌ /api/me error:', error);
    return NextResponse.json(
      { message: 'Error reading cookie' },
      { status: 500 },
    );
  }
}
