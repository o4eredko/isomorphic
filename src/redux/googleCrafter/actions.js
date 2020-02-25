import SuperFetch from "src/library/helpers/superFetch";


const notesAction = {
  LOAD_DATA: "LOAD_DATA",
  CHANGE_NOTE: "CHANGE_NOTE",
  ADD_NOTE: "ADD_NOTE",
  EDIT_NOTE: "EDIT_NOTE",
  DELETE_NOTE: "DELETE_NOTE",

  loadData: url => {
    return (dispatch, getState) => {
      SuperFetch.get(url).then(({ data, status }))
      dispatch({ type: notesAction.LOAD_DATA })
    }
  },
  changeNote: id => {
    return (dispatch) => {
      dispatch({
        type: notesAction.CHANGE_NOTE,
        selectedId: id,
      });
    };
  },
  addNote: () => {
    return (dispatch, getState) => {
      const newNote = {
        id: new Date(),
        note: "New Note",
        createTime: new Date(),
        color: getState().Notes.seectedColor,
      };
      const notes = [newNote, ...getState().Notes.notes];
      dispatch({
        type: notesAction.ADD_NOTE,
        selectedId: newNote.id,
        notes,
      });
    };
  },
  editNote: (id, newNote) => {
    return (dispatch, getState) => {
      const oldNotes = getState().Notes.notes;
      const notes = [];
      oldNotes.forEach(note => {
        if (note.id !== id) {
          notes.push(note);
        } else {
          note.note = newNote;
          notes.push(note);
        }
      });
      dispatch({
        type: notesAction.EDIT_NOTE,
        notes,
      });
    };
  },
  deleteNote: id => {
    return (dispatch, getState) => {
      const oldNotes = getState().Notes.notes;
      const notes = [];
      oldNotes.forEach(note => {
        if (note.id !== id) {
          notes.push(note);
        }
      });
      let selectedId = getState().Notes.selectedId;
      if (selectedId === id) {
        if (notes.length === 0) {
          selectedId = undefined;
        } else {
          selectedId = notes[0].id;
        }
      }
      dispatch({
        type: notesAction.DELETE_NOTE,
        notes,
        selectedId,
      });
    };
  },
};
export default notesAction;
