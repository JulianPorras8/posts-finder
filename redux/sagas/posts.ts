import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ACHIEVE_SET_POST,
  CHANGE_PAGE,
  GET_POSTS,
  NEW_POST,
  SET_POST,
  UPDATE_BODY,
  UPDATE_PAGE_NUMBER,
  UPDATE_POST,
  UPDATE_TITLE,
} from '../actions/types';

import { fetchPostsApi } from '../api';
import { getPostsSuccess, getPostsError } from '../actions/postsAction';

export function* getPosts() {
  try {
    const postData = yield call(fetchPostsApi);
    yield put(getPostsSuccess(postData));
  } catch (error) {
    yield put(getPostsError(error.toString()));
  }
}

function* updatePost(action) {
  yield put({
    type: UPDATE_POST,
    payload: action.payload,
  });
}

function* setPost(action) {
  yield put({
    type: ACHIEVE_SET_POST,
    payload: action.payload,
  });
}

function* setPage(action) {
  yield put({
    type: UPDATE_PAGE_NUMBER,
    payload: action.payload,
  });
}

export function* watchGetPosts() {
  yield takeLatest(GET_POSTS, getPosts);
}

export function* watchUpdateBody() {
  yield takeLatest(UPDATE_BODY, setPost);
}

export function* watchUpdateTitle() {
  yield takeLatest(UPDATE_TITLE, setPost);
}

export function* watchSetPost() {
  yield takeLatest(SET_POST, setPost);
}

export function* watchNewPost() {
  yield takeLatest(NEW_POST, updatePost);
}

export function* watchChangePage() {
  yield takeLatest(CHANGE_PAGE, setPage);
}
