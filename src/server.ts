import express from 'express';
import connectDB from './db/connect';  // Підключаємо connectDB для підключення до MongoDB

const app = express();

// Підключення до MongoDB
connectDB();

app.use(express.json());  // Для обробки JSON в тілі запитів

app.listen(5000, () => console.log('Server running on port 5000'));
