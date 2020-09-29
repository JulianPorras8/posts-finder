import { all, fork } from 'redux-saga/effects';

import {
  watchUpdateBody,
  watchUpdateTitle,
  watchSetPost,
  watchNewPost,
  watchGetPosts,
  watchChangePage,
} from './posts';

export default function* rootSaga() {
  yield all([
    fork(watchGetPosts),
    fork(watchUpdateBody),
    fork(watchUpdateTitle),
    fork(watchSetPost),
    fork(watchNewPost),
    fork(watchChangePage),
  ]);
}
