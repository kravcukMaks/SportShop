import { NextResponse } from 'next/server';
import User from '@/models/User'; // твоя модель User
import connectDB from '@/db/connect'; // функція для підключення до MongoDB

export async function POST(req: Request) {
  try {
    await connectDB(); // Підключаємо базу даних

    const { firstName, lastName, email, password } = await req.json(); // Дістаємо дані

    // Перевіряємо чи користувач існує
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'Такий email вже використовується' }, { status: 400 });
    }

    // Створюємо нового користувача
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    return NextResponse.json({ message: 'Користувача зареєстровано успішно!' }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 });
  }
}
