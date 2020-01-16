import { createSelector } from 'reselect';

export const getUserInterface = state => state.userInterface;

export const getShowDebugOverlay = createSelector(
  getUserInterface,
  userInterface => userInterface.get('showDebugOverlay')
);
