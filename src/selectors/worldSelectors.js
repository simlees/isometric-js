import { createSelector } from "reselect";

export const getWorld = state => state.world;

export const getWorldSize = createSelector(getWorld, world => {
  return [world.size, world.get(0).size];
});
