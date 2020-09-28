import { Request, Response } from 'express';
import { TRootState } from '../reducers'

declare global {
  interface IReq extends Request { }
  interface IRes extends Response { }

  type RootState = TRootState;

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
