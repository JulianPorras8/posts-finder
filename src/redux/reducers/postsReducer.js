import {
  ACHIEVE_SET_POST,
  CLOSE_ERROR,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  GET_POSTS,
  SET_PRESELECTED_POST,
  UPDATE_PAGE_NUMBER,
  UPDATE_POST,
} from '../actions/types';

export const initialState = {
  isLoading: false,
  items: [],
  error: '',
  pageNumber: 1,
  posts: [],
  selectedPost: null,
  preSelectedPost: null,
  postsInStore: [],
};

export default function postReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, isLoading: true };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        error: '',
      };
    case GET_POSTS_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case UPDATE_POST:
      return {
        ...state,
        postsInStore: state.postsInStore.concat([action.payload]),
        selectedPost: null,
      };
    case ACHIEVE_SET_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case SET_PRESELECTED_POST:
      return {
        ...state,
        preSelectedPost: action.payload,
      };
    case UPDATE_PAGE_NUMBER:
      return { ...state, pageNumber: action.payload };
    case CLOSE_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
}
