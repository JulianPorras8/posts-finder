import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { ETodoType } from './todoType';

const todoRegisterRequest = async data => await axios.post('/posts/', data);

function* todoRegister(action) {
  try {
    const result = yield call(todoRegisterRequest, action.payload);
    if (result.status === 200) {
      yield put({
        type: ETodoType.TODO_REGISTER_SUCCESS,
        payload: { todoData: result.data.todoData },
      });
    } else {
      yield put({
        type: ETodoType.TODO_REGISTER_FAILURE,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: ETodoType.TODO_REGISTER_ERROR,
      error: e,
    });
  }
}

function* watchTodoRegister() {
  yield takeLatest(ETodoType.TODO_REGISTER_REQUEST, todoRegister);
}

const todoLoadRequest = async () => await axios.get('/todo/');

function* todoLoad() {
  try {
    const result = yield call(todoLoadRequest);
    if (result.status === 200) {
      yield put({
        type: ETodoType.TODO_LOAD_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: ETodoType.TODO_LOAD_FAILURE,
        message: result.data.message,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: ETodoType.TODO_LOAD_ERROR,
      error: e,
    });
  }
}

function* watchTodoLoad() {
  yield takeLatest(ETodoType.TODO_LOAD_REQUEST, todoLoad);
}

const todoAchieveRequest = async data => await axios.delete(`/todo/${data}`);

function* todoAchieve(action) {
  try {
    const result = yield call(todoAchieveRequest, action.payload.id);
    if (result.status === 200) {
      yield put({
        type: ETodoType.TODO_ACHIEVE_SUCCESS,
        payload: { id: result.data.id },
      });
    } else {
      yield put({
        type: ETodoType.TODO_ACHIEVE_FAILURE,
        message: result.data.message,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: ETodoType.TODO_ACHIEVE_ERROR,
      error: e,
    });
  }
}

function* watchTodoAchieve() {
  yield takeLatest(ETodoType.TODO_ACHIEVE_REQUEST, todoAchieve);
}

export default function* todoSaga() {
  yield all([fork(watchTodoRegister), fork(watchTodoLoad), fork(watchTodoAchieve)]);
}
