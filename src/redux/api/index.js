import config from '../../../config';

import axios from 'axios';

export const fetchPostsApi = async () => {
  const response = await axios.get(`${config.apiEndpoint}:${config.port}/posts`);
  if (response.status >= 400) {
    throw new Error(response.data.message);
  }
  return response.data;
};
