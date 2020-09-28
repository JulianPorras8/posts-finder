import { combineReducers } from 'redux';
import postsReducers from './reducers/reducers/postsReducer';
import headerReducer from './reducers/reducers/headerReducer';
import editFormReducer from './reducers/reducers/editFormReducer';
import articleReducer from './reducers/reducers/articleReducer';

import todoReducer from './reducers/todoReducer';

const rootReducer = combineReducers({
  todo: todoReducer,
  header: headerReducer,
  posts: postsReducers,
  editForm: editFormReducer,
  article: articleReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
