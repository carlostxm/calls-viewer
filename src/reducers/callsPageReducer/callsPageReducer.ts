import { Call, CallsPage } from 'model';
import updateCallInPage from './updateCallInPage';

export type State = CallsPage | null;

export type ActionType =
  | { type: 'set-page'; payload: CallsPage | null }
  | { type: 'update-call'; payload: Call };

function callsPageReducer(state: State, { type, payload }: ActionType): State {
  switch (type) {
    case 'set-page':
      const page = payload as State;
      return page;

    case 'update-call':
      const call = payload as Call;
      return state ? updateCallInPage(call, state) : state;

    default:
      throw new Error('Action not supported in callsPageReducer');
  }
}

export default callsPageReducer;
