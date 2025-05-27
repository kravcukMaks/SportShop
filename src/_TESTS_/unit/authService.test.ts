import mongoose from 'mongoose';
import registerUser from '../../services/authService';
import User from '../../models/User';

jest.mock('../models/User');

const mockUser = {
  save: jest.fn(),
};

(User.findOne as jest.Mock).mockImplementation(async ({ email }) => null);

describe('registerUser', () => {
  it('registers user successfully', async () => {
    (User as unknown as jest.Mock).mockImplementation(() => mockUser);

    const user = await registerUser('Test', 'User', 'test@example.com', 'password');

    expect(user).toBe(mockUser);
    expect(mockUser.save).toHaveBeenCalled();
  });
});
