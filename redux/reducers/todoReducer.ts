import produce from 'immer';

import { ITodoState, ETodoType, TTodoAction } from './todoType';

export const initialTodoState: ITodoState = {
  todoDatas: [],
  message: null,
  error: null,
};

const todoReducer = (state = initialTodoState, action: TTodoAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case ETodoType.TODO_LOAD_REQUEST:
      case ETodoType.TODO_REGISTER_REQUEST:
      case ETodoType.TODO_ACHIEVE_REQUEST: {
        break;
      }

      case ETodoType.TODO_LOAD_SUCCESS: {
        draft.todoDatas = action.payload.todoDatas;
        break;
      }

      case ETodoType.TODO_REGISTER_SUCCESS: {
        draft.todoDatas.unshift(action.payload.todoData);
        break;
      }

      case ETodoType.TODO_ACHIEVE_SUCCESS: {
        const index = draft.todoDatas.findIndex(todoData => todoData.id === action.payload.id);
        draft.todoDatas.splice(index, 1);
        break;
      }

      case ETodoType.TODO_LOAD_FAILURE:
      case ETodoType.TODO_REGISTER_FAILURE:
      case ETodoType.TODO_ACHIEVE_FAILURE: {
        draft.message = action.message;
        break;
      }

      case ETodoType.TODO_LOAD_ERROR:
      case ETodoType.TODO_REGISTER_ERROR:
      case ETodoType.TODO_ACHIEVE_ERROR: {
        draft.error = action.error;
        break;
      }

      default:
        break;
    }
  });
};

export default todoReducer;
