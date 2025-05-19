import { NextResponse } from 'next/server';

let orders: any[] = []; // Тимчасове збереження в пам'яті сервера

export async function POST(req: Request) {
  const order = await req.json();
  orders.push(order);
  return NextResponse.json({ message: 'Замовлення збережено' });
}

export async function GET() {
  return NextResponse.json(orders);
}
