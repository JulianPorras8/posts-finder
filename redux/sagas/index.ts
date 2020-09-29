import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import { watchGetPosts } from './getPosts';
import { watchUpdateBody, watchUpdateTitle, watchSetPost } from './posts';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export default function* rootSaga() {
  yield all([
    fork(watchGetPosts), fork(watchUpdateBody), fork(watchUpdateTitle), fork(watchSetPost),
  ]);
}
