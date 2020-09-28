import path from 'path';
import express, { Express } from 'express';
import compression from 'compression';
import next from 'next';
import helmet from 'helmet';

import routes from '../routes';
import config from '../src/config';

const port = config.port;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server: Express = express();

  server.use(helmet());
  server.use(compression());

  const staticPath = path.join(__dirname, '../static');
  server.use('/static', express.static(staticPath, {
    maxAge: '30d',
    immutable: true
  }));

  server.post('/posts', (_, res) => {
    console.log(`server.post('/posts'`);
    return res.send([{ name: 'Julian', lastname: 'Porras' }]);
  });

  server.get('*', (req, res) => handler(req, res));

  startServer();

  function startServer () {
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});
