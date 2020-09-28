const config = {
  apiEndpoint: process.env.API_URL || 'http://localhost',
  blogTitle: 'Typicode Posts',
  port: parseInt(`${process.env.PORT}`, 10) || 3100,
};

export default config;
