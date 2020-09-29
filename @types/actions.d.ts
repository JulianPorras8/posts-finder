interface ITodoLoadRequest {
  type: ETodoType.TODO_LOAD_REQUEST;
}

type TTodoAction =
  | ITodoLoadRequest;