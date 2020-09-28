export interface ITodoState {
  todoDatas: ITodo[];
  message: string;
  error: Error;
}

export interface ITodo {
  id: number;
  content: string;
}

export enum ETodoType {
  TODO_LOAD_REQUEST = 'TODO_LOAD_REQUEST',
  TODO_LOAD_SUCCESS = 'TODO_LOAD_SUCCESS',
  TODO_LOAD_FAILURE = 'TODO_LOAD_FAILURE',
  TODO_LOAD_ERROR = 'TODO_LOAD_ERROR',
  TODO_REGISTER_REQUEST = 'TODO_REGISTER_REQUEST',
  TODO_REGISTER_SUCCESS = 'TODO_REGISTER_SUCCESS',
  TODO_REGISTER_FAILURE = 'TODO_REGISTER_FAILURE',
  TODO_REGISTER_ERROR = 'TODO_REGISTER_ERROR',
  TODO_ACHIEVE_REQUEST = 'TODO_ACHIEVE_REQUEST',
  TODO_ACHIEVE_SUCCESS = 'TODO_ACHIEVE_SUCCESS',
  TODO_ACHIEVE_FAILURE = 'TODO_ACHIEVE_FAILURE',
  TODO_ACHIEVE_ERROR = 'TODO_ACHIEVE_ERROR',
}

export type TTodoAction =
  | ITodoLoadRequest
  | ITodoLoadSuccess
  | ITodoLoadFailure
  | ITodoLoadError
  | ITodoRegisterRequest
  | ITodoRegisterSuccess
  | ITodoRegisterFailure
  | ITodoRegisterError
  | ITodoAchieveRequest
  | ITodoAchieveSuccess
  | ITodoAchieveFailure
  | ITodoAchieveError;

interface ITodoLoadRequest {
  type: ETodoType.TODO_LOAD_REQUEST;
}

interface ITodoLoadSuccess {
  type: ETodoType.TODO_LOAD_SUCCESS;
  payload: { todoDatas: ITodo[] };
}

interface ITodoLoadFailure {
  type: ETodoType.TODO_LOAD_FAILURE;
  message: string;
}

interface ITodoLoadError {
  type: ETodoType.TODO_LOAD_ERROR;
  error: Error;
}

interface ITodoRegisterRequest {
  type: ETodoType.TODO_REGISTER_REQUEST;
  payload: { content: string };
}

interface ITodoRegisterSuccess {
  type: ETodoType.TODO_REGISTER_SUCCESS;
  payload: { todoData: ITodo };
}

interface ITodoRegisterFailure {
  type: ETodoType.TODO_REGISTER_FAILURE;
  message: string;
}

interface ITodoRegisterError {
  type: ETodoType.TODO_REGISTER_ERROR;
  error: Error;
}

interface ITodoAchieveRequest {
  type: ETodoType.TODO_ACHIEVE_REQUEST;
  payload: { id: number };
}

interface ITodoAchieveSuccess {
  type: ETodoType.TODO_ACHIEVE_SUCCESS;
  payload: { id: number };
}

interface ITodoAchieveFailure {
  type: ETodoType.TODO_ACHIEVE_FAILURE;
  message: string;
}

interface ITodoAchieveError {
  type: ETodoType.TODO_ACHIEVE_ERROR;
  error: Error;
}
