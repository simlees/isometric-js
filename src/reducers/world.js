import { fromJS } from "immutable";
// import // INITIALISE_GAME,
// // PAUSE_TICK,
// // RESUME_TICK
// "../constants/actionTypes";

const initialState = fromJS([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);

export default function world(state = initialState, action) {
  switch (action.type) {
    // case INITIALISE_GAME: {
    //   return state.set('ready', true);
    // }
    default:
      return state;
  }
}
