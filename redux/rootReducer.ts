import { combineReducers } from 'redux';

import todoReducer from './todo/todoReducer';

const rootReducer = combineReducers({
  todo: todoReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
