export const getKeyMapFromConfig = config =>
  Object.keys(config).reduce((map, key) => {
    map[config[key]] = key;
    return map;
  }, {});
