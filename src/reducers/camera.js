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
  MOUSE_MOVE,
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
  mouseX: config.view.canvasWidth / 2,
  mouseY: config.view.canvasHeight / 2,
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
    case MOUSE_MOVE: {
      const { x, y } = action;
      // state = state.update('mouseX', mouseX => mouseX + x);
      // return state.update('mouseY', mouseY => mouseY + y);

      return state.withMutations(map => {
        const { canvasWidth, canvasHeight } = config.view;
        let newMouseX = map.get('mouseX') + x;
        let newMouseY = map.get('mouseY') + y;
        let cameraMoveX = 0;
        let cameraMoveY = 0;
        if (newMouseX > canvasWidth) {
          cameraMoveX = newMouseX - canvasWidth;
          newMouseX = canvasWidth;
        }
        if (newMouseX < 0) {
          cameraMoveX = newMouseX;
          newMouseX = 0;
        }
        if (newMouseY > canvasHeight) {
          cameraMoveY = newMouseY - canvasHeight;
          newMouseY = canvasHeight;
        }
        if (newMouseY < 0) {
          cameraMoveY = newMouseY;
          newMouseY = 0;
        }
        map.set('mouseX', newMouseX);
        map.set('mouseY', newMouseY);
        console.log(cameraMoveX, cameraMoveY);
        map.update('xPos', xPos => xPos - cameraMoveX);
        map.update('yPos', yPos => yPos - cameraMoveY);
      });
    }
    default:
      return state;
  }
}
