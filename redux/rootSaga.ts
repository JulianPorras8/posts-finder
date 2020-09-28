import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import todoSaga from './reducers/todoSaga';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export default function* rootSaga() {
  yield all([fork(todoSaga)]);
}
