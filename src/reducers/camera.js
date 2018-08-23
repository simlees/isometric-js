import { fromJS } from 'immutable';
import {
  CAMERA_DOWN,
  CAMERA_LEFT,
  CAMERA_RIGHT,
  CAMERA_UP,
  CAMERA_ROTATE_CLOCKWISE,
  CAMERA_ROTATE_COUNTER_CLOCKWISE,
  GAME_TICK,
  CAMERA_CYCLE_ZOOM,
} from '../constants/actionTypes';
import { getCameraMovementVector } from '../selectors/cameraSelectors';
import config from '../config';

const initialState = fromJS({
  xPos: 0,
  yPos: 0,
  rotation: 0, // NORTHWEST
  zoom: config.view.defaultZoom,
  isMoving: {
    left: false,
    up: false,
    right: false,
    down: false,
  },
});

const holdableActions = [CAMERA_LEFT, CAMERA_UP, CAMERA_RIGHT, CAMERA_DOWN];

export default function camera(state = initialState, action) {
  if (!holdableActions.includes(action.type) && action.isPressed === true) {
    return state;
  }
  switch (action.type) {
    case CAMERA_LEFT: {
      return state.setIn(['isMoving', 'left'], action.isPressed);
    }
    case CAMERA_UP: {
      return state.setIn(['isMoving', 'up'], action.isPressed);
    }
    case CAMERA_RIGHT: {
      return state.setIn(['isMoving', 'right'], action.isPressed);
    }
    case CAMERA_DOWN: {
      return state.setIn(['isMoving', 'down'], action.isPressed);
    }
    case CAMERA_ROTATE_CLOCKWISE: {
      return state.update('rotation', rotation => (rotation + 1) % 4);
    }
    case CAMERA_ROTATE_COUNTER_CLOCKWISE: {
      return state.update('rotation', rotation => (rotation + 3) % 4);
    }
    case CAMERA_CYCLE_ZOOM: {
      state = state.withMutations(map => {
        const prev = map.get('zoom');
        const stops = config.view.zoomStops;
        const stop = stops.indexOf(prev);
        const next = stops[(stop + 1) % stops.length];
        const diffFactor = next / prev;
        map.update('xPos', xPos => xPos * diffFactor);
        map.update('yPos', yPos => yPos * diffFactor);
        map.set('zoom', next);
        // return next;
      });
      return state;
    }
    case GAME_TICK: {
      const [x, y] = getCameraMovementVector(state);
      state = state.update('xPos', xPos => xPos + x);
      return state.update('yPos', yPos => yPos + y);
    }
    default:
      return state;
  }
}
