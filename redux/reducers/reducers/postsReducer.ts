import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  UPDATE_POST,
  UPDATE_PAGE_NUMBER,
  ACHIEVE_SET_POST,
} from '../../actions/types';

export const initialState: IPostState = {
  isLoading: false,
  items: [],
  error: '',
  pageNumber: 1,
  posts: [],
  selectedPost: null,
  postsInStore: [],
};

export default function postReducer(state = initialState, action: any = {}) {
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
    case UPDATE_PAGE_NUMBER:
      return { ...state, pageNumber: action.payload };
    default:
      return state;
  }
}
