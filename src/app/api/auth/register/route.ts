import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/db/connect';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { firstName, lastName, email, password } = await req.json();

    
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: 'Всі поля є обов’язковими' }, { status: 400 });
    }

    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'Такий email вже використовується' }, { status: 400 });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: 'Користувача зареєстровано успішно!' }, { status: 201 });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 });
  }
}

