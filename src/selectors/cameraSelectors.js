import { createSelector } from 'reselect';
import config from '../config';

const getCamera = state => state.camera;

const getCameraIsMovingDirections = createSelector(getCamera, camera =>
  camera.get('isMovingDirections')
);

const createCameraSelector = setting =>
  createSelector([getCamera], camera => camera.get(setting));

export const getCameraRotation = createCameraSelector('rotation');
export const getCameraZoom = createCameraSelector('zoom');
export const getMouseX = createCameraSelector('mouseX');
export const getMouseY = createCameraSelector('mouseY');

export const getCameraOffset = createSelector([getCamera], camera => [
  camera.get('xPos'),
  camera.get('yPos'),
]);

export const getCameraMovementVector = createSelector(
  [getCameraIsMovingDirections, getMouseX, getMouseY],
  (isMovingDirections, mouseX, mouseY) => {
    const { canvasWidth, canvasHeight } = config.view;
    let x = 0;
    let y = 0;
    const arrowMovementSpeed = 5;
    const cursorMovementSpeed = 14;
    if (mouseX === 0) {
      x += cursorMovementSpeed;
    } else if (mouseX === canvasWidth) {
      x -= cursorMovementSpeed;
    } else {
      if (isMovingDirections.get('left')) {
        x += arrowMovementSpeed;
      }
      if (isMovingDirections.get('right')) {
        x -= arrowMovementSpeed;
      }
    }
    if (mouseY === 0) {
      y += cursorMovementSpeed;
    } else if (mouseY === canvasHeight) {
      y -= cursorMovementSpeed;
    } else {
      if (isMovingDirections.get('up')) {
        y += arrowMovementSpeed;
      }
      if (isMovingDirections.get('down')) {
        y -= arrowMovementSpeed;
      }
    }
    return [x, y];
  }
);

export const getGridOffset = createSelector(
  [getCameraOffset, getCameraZoom],
  ([xOffset, yOffset], zoom) => {
    const x_pos = xOffset / zoom;
    const y_pos = yOffset / (zoom / 2);
    const x_grid = x_pos + y_pos;
    const y_grid = x_pos - y_pos;
    return [Math.round(x_grid), Math.round(y_grid)]; // TODO - remove rounding
  }
);
