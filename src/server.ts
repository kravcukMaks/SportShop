import express from 'express';
import connectDB from './db/connect';
import authRoutes from './routes/authRoutes'; // Імпортуємо роут

const app = express();

connectDB();

app.use(express.json());

// Підключаємо маршрут
app.use('/api/auth', authRoutes); 

app.listen(5000, () => console.log('Server running on port 5000'));

