import * as configUtils from "../utils/configUtils";
import { loadAssets } from "../utils/assetUtils";

export default function(config) {
  loadAssets(config.assets).then(assets => {
    const ctx = setUpCanvas(config);
    setUpControls(config);
    draw(ctx, assets);
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

var something = 1;

function draw(ctx, assets) {
  if (true) {
    requestAnimationFrame(() => draw(ctx, assets));
  }
  // ctx.clearRect(0, 0, 640, 480);
  // ctx.beginPath();
  // ctx.rect(something, 40, 50, 50);
  // ctx.fillStyle = "#FF0000";
  // ctx.fill();
  // ctx.closePath();

  ctx.drawImage(assets.images.blocks.red, something, 40, 50, 50);

  something++;
}

// function mouseMoveHandler(e) {
//   var relativeX = e.clientX - canvas.offsetLeft;
//   if (relativeX > 0 && relativeX < canvas.width) {
//     paddleX = relativeX - paddleWidth / 2;
//   }
// }
