import { createSelector } from 'reselect';

export const getCamera = state => state.camera;

export const getCameraIsMoving = camera => camera.get('isMoving');

const createCameraSelector = setting =>
  createSelector([getCamera], camera => camera.get(setting));

export const getCameraRotation = createCameraSelector('rotation');
export const getCameraZoom = createCameraSelector('zoom');

export const getCameraMovementVector = createSelector(
  [getCameraIsMoving],
  isMoving => {
    let x = 0;
    let y = 0;
    const movementSpeed = 3;
    if (isMoving.get('left')) {
      x += movementSpeed;
    }
    if (isMoving.get('up')) {
      y += movementSpeed;
    }
    if (isMoving.get('right')) {
      x -= movementSpeed;
    }
    if (isMoving.get('down')) {
      y -= movementSpeed;
    }
    return [x, y];
  }
);

export const getCameraOffset = createSelector([getCamera], camera => [
  camera.get('xPos'),
  camera.get('yPos'),
]);
