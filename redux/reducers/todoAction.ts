import { ETodoType } from './todoType';

export const todoRegisterAction = (content: string) => ({
  type: ETodoType.TODO_REGISTER_REQUEST,
  payload: { content },
});

export const todoAchieveAction = () => ({ type: ETodoType.TODO_ACHIEVE_REQUEST });

export const todoLoad = () => ({
  type: ETodoType.TODO_LOAD_REQUEST,
});
