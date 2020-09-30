const config = {
  apiEndpoint: process.env.API_URL || 'http://localhost',
  port: parseInt(`${process.env.PORT}`, 10) || 3000,
};

module.exports = config;
