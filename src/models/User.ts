import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, '👤 Ім’я обов’язкове'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, '👥 Прізвище обов’язкове'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, '📧 Email обов’язковий'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Невірний формат email',
      ],
    },
    password: {
      type: String,
      required: [true, '🔐 Пароль обов’язковий'],
      minlength: [6, 'Пароль має містити щонайменше 6 символів'],
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;


