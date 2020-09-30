const next = require('next');
const express = require('express');
const path = require('path');

// Routes
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // Express Configuration
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use('/public/', express.static(path.join(__dirname, '../public')));

    // App routes
    console.log('23 routes', routes);
    server.use('/posts', routes);

    // NextJs Configuration
    server.get('*', (req, res) => handler(req, res));

    server.listen(3000, () => {
      console.log('ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
