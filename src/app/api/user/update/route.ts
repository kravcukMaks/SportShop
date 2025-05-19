import { NextResponse } from 'next/server';
import connectDB from '@/db/connect';
import User from '@/models/User';

export async function PUT(req: Request) {
  try {
    // Спочатку підключаємося до бази
    await connectDB();

    // Забираємо дані з запиту
    const { firstName, lastName, email, password } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email обовʼязковий для оновлення.' }, { status: 400 });
    }

    // Оновлюємо користувача за email
    const updatedUser = await User.findOneAndUpdate(
      { email }, // шукаємо за email
      { firstName, lastName, password }, // нові дані
      { new: true } // повернути новий документ після оновлення
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'Користувача не знайдено.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Дані успішно оновлені!' }, { status: 200 });
  } catch (error) {
    console.error('Помилка при оновленні користувача:', error);
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}
