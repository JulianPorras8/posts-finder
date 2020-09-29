import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (_, res) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.status(200).json(response.data);
});

export default router;
