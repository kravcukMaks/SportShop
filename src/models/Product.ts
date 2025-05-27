import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    title: {
      type: String,
      required: [true, '🛍️ Назва товару обов’язкова'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, '📝 Опис товару обов’язковий'],
    },
    price: {
      type: Number,
      required: [true, '💰 Ціна обов’язкова'],
      min: [0, 'Ціна не може бути від’ємною'],
    },
    imageUrl: {
      type: String,
      required: [true, '🖼️ Посилання на зображення обов’язкове'],
    },
    category: {
      type: String,
      required: [true, '📦 Категорія обов’язкова'],
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

