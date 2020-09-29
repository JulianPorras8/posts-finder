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

    server.get('/posts', (_, res) => {
      return res.status(200).json([{
        id: 1,
        userId: 1,
        title: 'test 1',
        body: 'post Body 1',
      }, {
        id: 2,
        userId: 1,
        title: 'test 2',
        body: 'post Body 2',
      }, {
        id: 3,
        userId: 1,
        title: 'test 3',
        body: 'post Body 3',
      },{
        id: 4,
        userId: 2,
        title: 'test 4',
        body: 'post Body 4',
      }, {
        id: 5,
        userId: 1,
        title: 'test 5',
        body: 'post Body 5',
      }, {
        id: 6,
        userId: 2,
        title: 'test 6',
        body: 'post Body 6',
      },{
        id: 7,
        userId: 2,
        title: 'test 7',
        body: 'post Body 7',
      }, {
        id: 8,
        userId: 3,
        title: 'test 8',
        body: 'post Body 8',
      }, {
        id: 9,
        userId: 3,
        title: 'test 9',
        body: 'post Body 9',
      }]);
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
