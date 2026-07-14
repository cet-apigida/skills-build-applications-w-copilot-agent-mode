import { Router } from 'express';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const items = await User.find().lean();
    res.json({ resource: 'users', items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default usersRouter;
