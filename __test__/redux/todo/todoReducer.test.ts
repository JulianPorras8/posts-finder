import todoReducer, { initialTodoState } from '@redux/todo/todoReducer';
import { ETodoType } from '@redux/todo/todoType';

describe('todoReducer', () => {
  const mockTodoDatas = [
    { id: 0, content: 'hi' },
    { id: 1, content: 'bye' },
  ];

  it('should return the initial state when init reducer', () => {
    expect(todoReducer(initialTodoState, {} as any)).toEqual(initialTodoState);
  });

  it('should loads todoDatas when the load request success', () => {
    expect(
      todoReducer(initialTodoState, {
        type: ETodoType.TODO_LOAD_SUCCESS,
        payload: { todoDatas: mockTodoDatas },
      }),
    ).toEqual({ todoDatas: mockTodoDatas, message: null, error: null });
  });

  it('should inserts the todoData when the insert request success', () => {
    expect(
      todoReducer(initialTodoState, {
        type: ETodoType.TODO_REGISTER_SUCCESS,
        payload: { todoData: { id: 100, content: 'test' } },
      }),
    ).toEqual({ todoDatas: [{ id: 100, content: 'test' }], message: null, error: null });
  });

  it('should removes the todoData when the achieve request success', () => {
    expect(
      todoReducer(
        { todoDatas: mockTodoDatas, message: null, error: null },
        {
          type: ETodoType.TODO_ACHIEVE_SUCCESS,
          payload: { id: 0 },
        },
      ),
    ).toEqual({ todoDatas: [{ id: 1, content: 'bye' }], message: null, error: null });
  });
});
