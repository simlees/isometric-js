import * as configUtils from '../utils/configUtils';
import { loadAssets } from '../utils/assetUtils';
import { GAME_TICK } from '../constants/actionTypes';
import { getWorld, getWorldSize } from '../selectors/worldSelectors';
import {
  getCameraOffset,
  getCameraRotation,
  getCameraZoom,
} from '../selectors/cameraSelectors';
import { getTileCoords } from '../utils/worldUtils';

let _assets, _ctx, _store, _config, _canvasWidth, _canvasHeight;

export default function(config, store) {
  _config = config;
  _store = store;
  loadAssets(config.assets).then(assets => {
    _assets = assets;
    _ctx = setUpCanvas();
    setUpControls();
    gameLoop();
  });
}

function setUpCanvas() {
  _canvasWidth = _config.view.canvasWidth;
  _canvasHeight = _config.view.canvasHeight;
  const canvas = document.getElementById('game-canvas');
  return canvas.getContext('2d');
}

function setUpControls() {
  const keyMap = configUtils.getKeyMapFromConfig(_config.keyMapping);
  const keyHandler = e => {
    const action = keyMap[e.keyCode];
    if (action) {
      _store.dispatch({
        type: action,
        isPressed: e.type === 'keydown',
      });
    }
  };
  // document.addEventListener("mousemove", mouseMoveHandler, false);

  document.addEventListener('keyup', keyHandler, false);
  document.addEventListener('keydown', keyHandler, false);
}

function gameLoop() {
  if (true) {
    requestAnimationFrame(() => gameLoop());
  }
  const state = _store.getState();
  draw(state);
  _store.dispatch({ type: GAME_TICK });
}

var tileWidth, tileHeight;

function draw(state) {
  const world = getWorld(state);
  const [worldWidth, worldHeight] = getWorldSize(state);
  const zoom = getCameraZoom(state);
  const rotation = getCameraRotation(state);
  _ctx.clearRect(0, 0, _canvasWidth, _canvasHeight);
  tileWidth = zoom;
  tileHeight = zoom / 2;
  _ctx.save();
  const [xOffset, yOffset] = getCameraOffset(state);
  _ctx.translate(_canvasWidth / 2 + xOffset, 100 + yOffset);

  for (let x = 0; x < (rotation % 2 ? worldHeight : worldWidth); x++) {
    for (let y = 0; y < (rotation % 2 ? worldWidth : worldHeight); y++) {
      drawTile(
        x,
        y,
        world.getIn(getTileCoords(x, y, worldWidth, worldHeight, rotation))
      );
    }
  }
  _ctx.restore();
}

function drawTile(x, y, tile) {
  _ctx.save();
  _ctx.translate(((x - y) * tileWidth) / 2, ((x + y) * tileHeight) / 2);

  const img = _assets.images.blocks[tile];

  if (img) {
    const renderedHeight = (img.height / img.width) * 2;
    _ctx.drawImage(
      img,
      -tileWidth / 2,
      -tileHeight * (renderedHeight - 1),
      tileWidth,
      tileHeight * renderedHeight
    );
  } else {
    _ctx.beginPath();
    _ctx.moveTo(0, 0);
    _ctx.lineTo(tileWidth / 2, tileHeight / 2);
    _ctx.lineTo(0, tileHeight);
    _ctx.lineTo(-tileWidth / 2, tileHeight / 2);
    _ctx.closePath();
    _ctx.fillStyle = 'red';
    _ctx.fill();
  }

  _ctx.restore();
}
