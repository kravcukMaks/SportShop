import { NextResponse } from 'next/server';
import connectDB from '@/db/connect';
import Product from '@/models/Product';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let products;

    if (category) {
      // Фільтруємо за категорією
      products = await Product.find({ category: category.toLowerCase() });
    } else {
      // Якщо категорія не вказана — повертаємо всі товари
      products = await Product.find();
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Помилка при отриманні товарів:', error);
    return NextResponse.json(
      { error: 'Помилка при отриманні товарів' },
      { status: 500 }
    );
  }
}

    