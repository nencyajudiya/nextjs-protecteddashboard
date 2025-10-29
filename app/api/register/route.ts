import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  console.log('📩 [REGISTER] Incoming request...');

  try {
    await connectDB();

    const { name, email, password } = await req.json();
    console.log('📨 Received data:', { name, email, password });

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    console.log('✅ User saved successfully:', newUser);

    // ✅ Important: add ok: true
    return NextResponse.json(
      { ok: true, message: 'User registered successfully', user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Register error:', error.message || error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
