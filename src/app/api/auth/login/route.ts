import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/db/connect';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email і пароль обовʼязкові' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Користувача не знайдено' }, { status: 404 });
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Невірний пароль' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Вхід успішний' }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 });
  }
}

