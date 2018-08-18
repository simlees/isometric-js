import { createSelector } from "reselect";

const getWorld = state => state.world;

export const getWorldSize = createSelector(getWorld, world => {
  debugger;
});
