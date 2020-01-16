import { fromJS } from 'immutable';
import { TOGGLE_DEBUG_OVERLAY } from '../constants/actionTypes';

const initialState = fromJS({
  showDebugOverlay: true,
});

export default function userInterface(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DEBUG_OVERLAY: {
      return state.update(
        'showDebugOverlay',
        showDebugOverlay => !showDebugOverlay
      );
    }
    default:
      return state;
  }
}
