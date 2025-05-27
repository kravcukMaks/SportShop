import { NextResponse } from 'next/server';

interface Order {
  id: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  customerName: string;
  address: string;
  totalAmount: number;
}

let orders: Order[] = [];

export async function POST(req: Request) {
  try {
    const order: Order = await req.json();

    if (
      !order ||
      !order.items?.length ||
      typeof order.customerName !== 'string' ||
      typeof order.address !== 'string'
    ) {
      return NextResponse.json({ message: 'Невірний формат замовлення' }, { status: 400 });
    }

    orders.push(order);

    return NextResponse.json({ message: 'Замовлення збережено' }, { status: 201 });
  } catch (error) {
    console.error('POST order error:', error);
    return NextResponse.json({ message: 'Помилка сервера' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(orders);
}
