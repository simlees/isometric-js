import { fromJS } from 'immutable';
// import // INITIALISE_GAME,
// // PAUSE_TICK,
// // RESUME_TICK
// "../constants/actionTypes";

const initialState = fromJS([
  [1, 1, 'blockShort', 1, 'blockTall', 'tree'],
  ['blockTall', 1, 'blockShort', 1, 'blockShort', 'tile'],
  [1, 'tree', 'block', 1, 'blockTall', 1],
  ['block', 'tile', 'block', 1, 'blockTall', 1][
    (1, 1, 'blockShort', 1, 'blockTall', 1)
  ],
  ['block', 'tile', 'block', 1, 'blockShort', 'blockShort'],
  ['block', 'tile', 'block', 1, 'blockTall', 'blockTall'],
  ['block', 'tile', 'block', 1, 'blockTall', 'blockTall'],
]);

export default function world(state = initialState, action) {
  switch (action.type) {
    // case INITIALISE_GAME: {
    //   return state.set('ready', true);
    // }
    default:
      return state;
  }
}
