import * as configUtils from "../utils/configUtils";
import { loadAssets } from "../utils/assetUtils";
import { GAME_TICK } from "../constants/actionTypes";

export default function(config, store) {
  loadAssets(config.assets).then(assets => {
    const ctx = setUpCanvas(config);
    setUpControls(config);
    gameLoop(ctx, assets, store);
  });
}

function setUpCanvas(config) {
  var canvas = document.getElementById("game-canvas");
  return canvas.getContext("2d");
}

function setUpControls(config) {
  const keyMap = configUtils.getKeyMapFromConfig(config.keyMapping);
  const keyHandler = e => {
    const action = keyMap[e.keyCode];
    if (action) {
      // dispatch({
      //   type: action,
      //   isPressed: e.type === "keydown"
      // });
    }
  };
  // document.addEventListener("mousemove", mouseMoveHandler, false);

  document.addEventListener("keyup", keyHandler, false);
  document.addEventListener("keydown", keyHandler, false);
}

function gameLoop(ctx, assets, store) {
  if (true) {
    requestAnimationFrame(() => gameLoop(ctx, assets, store));
  }
  const state = store.getState();
  draw(ctx, assets, state);
  store.dispatch({ type: GAME_TICK });
}

function draw(ctx, assets, state) {}
