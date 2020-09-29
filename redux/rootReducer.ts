import { combineReducers } from 'redux';
import postsReducers from './reducers/reducers/postsReducer';

import todoReducer from './reducers/todoReducer';

const rootReducer = combineReducers({
  todo: todoReducer,
  posts: postsReducers,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
