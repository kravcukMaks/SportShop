import express, { Request, Response } from 'express';
import registerUser from '../services/authService';

const router = express.Router();

interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


router.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

    
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: '❗ Всі поля обов’язкові для заповнення',
      });
    }

    try {
      const newUser = await registerUser(firstName, lastName, email, password);
      res.status(201).json({
        message: '✅ Користувач успішно зареєстрований',
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
    } catch (error) {
      res.status(400).json({
        message:
          error instanceof Error
            ? `❌ ${error.message}`
            : 'Щось пішло не так при реєстрації',
      });
    }
  }
);


export default router;

