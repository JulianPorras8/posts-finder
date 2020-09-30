const { Router } = require('express');
const axios = require('axios');

const router = Router();

router.get('/healthcheck', () => res.status(200).send('OK'));

router.get('/', async (_, res) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.status(200).json(response.data);
});

module.exports = router;
