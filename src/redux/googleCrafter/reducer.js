import notes from './data';
import actions from './actions';

const initState = {
  notes,
  selectedId: notes[0].id,
};

export default function noteReducer(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_NOTE:
      return {
        ...state,
        selectedId: action.selectedId,
      };
    case actions.ADD_NOTE:
      return {
        ...state,
        notes: action.notes,
        selectedId: action.selectedId,
      };
    case actions.EDIT_NOTE:
      return {
        ...state,
        notes: action.notes,
      };
    case actions.DELETE_NOTE:
      return {
        ...state,
        notes: action.notes,
        selectedId: action.selectedId,
      };
    default:
      return state;
  }
}
