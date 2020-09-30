import { combineReducers } from 'redux';
import postsReducers from './postsReducer';

const rootReducer = combineReducers({
  posts: postsReducers,
});

export default rootReducer;
