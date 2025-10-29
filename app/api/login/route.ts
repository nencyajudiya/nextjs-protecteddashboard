import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password required' },
        { status: 400 },
      );
    }

    const filePath = path.join(process.cwd(), 'users.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(data || '[]');

    const user = users.find(
      (u: any) => u.email === email && u.password === password,
    );

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // encode basic token
    const tokenPayload = Buffer.from(JSON.stringify(user)).toString('base64');

    const res = NextResponse.json({ ok: true, user });
    res.cookies.set('auth', tokenPayload, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    console.log(`✅ Cookie set successfully for user: ${email}`);
    return res;
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
