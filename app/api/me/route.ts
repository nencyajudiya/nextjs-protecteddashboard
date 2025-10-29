import connectDB from '../../../lib/mongodb';
import User from '@/models/User';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth');

    if (!authCookie?.value) {
      return NextResponse.json({ message: 'Not logged in' }, { status: 401 });
    }

    const decoded = Buffer.from(authCookie.value, 'base64').toString('utf-8');
    const userData = JSON.parse(decoded);

    const user = await User.findOne({ email: userData.email }).select(
      '-password',
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('❌ /api/me error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
