export const getTileCoords = (x, y, width, height, rotation) => {
  switch (rotation) {
    case 1:
      return [y, height - 1 - x];
    case 2:
      return [width - 1 - x, height - y - 1];
    case 3:
      return [width - y - 1, x];
    default:
      return [x, y];
  }
};
