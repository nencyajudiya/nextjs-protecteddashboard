import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  console.log('📩 [LOGIN] Incoming request...');
  await connectDB();

  const { email, password } = await req.json();
  console.log('📨 Login data:', { email, password });

  const user = await User.findOne({ email, password });
  if (!user) {
    console.log('❌ Invalid credentials');
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  // ✅ Create a lightweight token (no JWT needed for now)
  const token = Buffer.from(JSON.stringify({ email: user.email, name: user.name })).toString('base64');

  // ✅ Set the cookie
  const res = NextResponse.json({ ok: true, message: 'Login successful', user });

  res.cookies.set({
    name: 'auth',
    value: token,
    httpOnly: false, // set true if using server-side auth only
    path: '/',       // <--- ensures cookie is valid for all routes
    sameSite: 'lax',
  });

  console.log('✅ Cookie set, returning success');
  return res;
}
