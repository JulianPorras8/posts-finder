import next from 'next';
import express from 'express';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use('/public/', express.static(path.join(__dirname, 'public')));

    server.get('/detail/:id', (req, res) => app.render(req, res, '/detail', { id: req.params.id }));

    server.post('/posts', (_, res) => {
      return res.status(200).json({
        message: 'Success insert content',
        todoData: { id: 3, content: 'result.content' },
      });
    });

    server.get('/todo', (_, res) => {
      console.log(`server.post('/todo'`);
      return res.status(200).json({ todoDatas: [{ id: 2, content: 'test content' }] });
    });

    server.get('*', (req, res) => handler(req, res));

    server.listen(3000, () => {
      console.log('ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
