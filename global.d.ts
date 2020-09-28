import { TRootState } from './redux/rootReducer'

declare global {
  type RootState = TRootState;
}
