import { fromJS } from "immutable";
import {
  CAMERA_DOWN,
  CAMERA_LEFT,
  CAMERA_RIGHT,
  CAMERA_UP,
  CAMERA_ROTATE_CLOCKWISE,
  CAMERA_ROTATE_COUNTER_CLOCKWISE,
  GAME_TICK
} from "../constants/actionTypes";
import { getCameraMovementVector } from "../selectors/cameraSelectors";

const initialState = fromJS({
  xPos: 0,
  yPos: 0,
  rotation: 0, // NORTHWEST
  zoom: 10,
  isMoving: {
    left: false,
    up: false,
    right: false,
    down: false
  }
});

export default function camera(state = initialState, action) {
  switch (action.type) {
    case CAMERA_LEFT: {
      return state.setIn(["isMoving", "left"], action.isPressed);
    }
    case CAMERA_UP: {
      return state.setIn(["isMoving", "up"], action.isPressed);
    }
    case CAMERA_RIGHT: {
      return state.setIn(["isMoving", "right"], action.isPressed);
    }
    case CAMERA_DOWN: {
      return state.setIn(["isMoving", "down"], action.isPressed);
    }
    case CAMERA_ROTATE_CLOCKWISE: {
      return !action.isPressed
        ? state.update("rotation", rotation => (rotation + 1) % 4)
        : state;
    }
    case CAMERA_ROTATE_COUNTER_CLOCKWISE: {
      return !action.isPressed
        ? state.update("rotation", rotation => (rotation + 3) % 4)
        : state;
    }
    case GAME_TICK: {
      const [x, y] = getCameraMovementVector(state);
      state = state.update("xPos", xPos => xPos + x);
      return state.update("yPos", yPos => yPos + y);
    }
    default:
      return state;
  }
}
