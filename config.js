const config = {
  apiEndpoint: process.env.API_URL || 'http://localhost',
  port: parseInt(`${process.env.PORT}`, 10) || 80,
};

module.exports = config;
