import { combineReducers } from 'redux';
import postsReducers from './reducers/postsReducer';

const rootReducer = combineReducers({
  posts: postsReducers,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
