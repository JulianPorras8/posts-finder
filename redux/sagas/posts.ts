import { put, takeLatest } from 'redux-saga/effects';

import { UPDATE_POST, UPDATE_TITLE, UPDATE_BODY, SET_POST, ACHIEVE_SET_POST } from '../actions/types';

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

export function* watchUpdateBody() {
    yield takeLatest(UPDATE_BODY, updatePost);
}

export function* watchUpdateTitle() {
  yield takeLatest(UPDATE_TITLE, updatePost);
}

export function* watchSetPost() {
  yield takeLatest(SET_POST, setPost);
}
