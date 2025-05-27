import { NextResponse } from 'next/server';
import connectDB from '@/db/connect';
import Product from '@/models/Product';

interface ProductPayload {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { title, description, price, imageUrl, category }: ProductPayload = await req.json();

    if (!title || !description || !price || !imageUrl || !category) {
      return NextResponse.json({ error: 'Усі поля обовʼязкові' }, { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      imageUrl,
      category,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Помилка при додаванні товару:', error);
    return NextResponse.json({ error: 'Помилка при додаванні товару' }, { status: 500 });
  }
}

