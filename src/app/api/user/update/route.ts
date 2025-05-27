import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/db/connect';
import User from '@/models/User';

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { firstName, lastName, email, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email обовʼязковий для оновлення.' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Користувача не знайдено.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Дані користувача успішно оновлені.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Помилка при оновленні користувача:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}
