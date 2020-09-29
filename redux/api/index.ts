import config from '../config';

import axios from 'axios';

export default function fetchApi(path = '', options = {}) {
  return fetch(`${config.apiEndpoint}:${config.port}` + path, options);
}

export const fetchPostsApi = async () => {
  const response = await axios.get('/posts');
  console.log('data >>>', response.data);
  if (response.status >= 400) {
    throw new Error(response.data.message);
  }
  return response.data;
};
