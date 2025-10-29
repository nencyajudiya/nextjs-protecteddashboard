import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const usersFile = path.join(process.cwd(), 'users.json');

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 },
      );
    }

    let users: any[] = [];
    try {
      const data = await fs.readFile(usersFile, 'utf-8');
      users = data.trim() ? JSON.parse(data) : [];
    } catch {
      users = [];
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      );
    }

    users.push({ email, password, name });
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

    console.log(`✅ User registered: ${email}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('❌ Registration error:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
