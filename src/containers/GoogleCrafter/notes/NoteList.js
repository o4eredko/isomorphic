import React from "react";
// import { timeDifference } from "@iso/lib/helpers/utility";
import Button from "@iso/components/uielements/button";
import { InputSearch } from "@iso/components/uielements/input";
import { NoteListWrapper } from "./Note.styles";
import Scrollbars from "@iso/components/utility/customScrollBar";

const [NOTE_COLOR, ACTIVE_NOTE_COLOR] = ["#511E78", "#ff9009"];

function filterNotes(notes, search) {
  search = search.toUpperCase();
  if (search) {
    return notes.filter(note => note.note.toUpperCase().includes(search));
  }
  return notes;
}

export default function(props) {
  const [search, setSearch] = React.useState("");

  const singleNote = note => {
    const { selectedId, deleteNote, changeNote } = props;
    const activeClass = selectedId === note.id ? "active" : "";

    return (
      <div className={`isoList ${activeClass}`} key={note.id}>
        <div
          className="isoNoteBGColor"
          style={{
            width: "5px",
            background: selectedId === note.id ? NOTE_COLOR : ACTIVE_NOTE_COLOR
          }}
        />
        <div className="isoNoteText" onClick={() => changeNote(note.id)}>
          <h3>{note.note}</h3>
          {/* <span className="isoNoteCreatedDate"> */}
          {/* {timeDifference(note.createTime)} */}
          {/* </span> */}
        </div>
        <Button
          className="isoDeleteBtn"
          icon="close"
          type="default"
          onClick={() => deleteNote(note.id)}
        />
      </div>
    );
  };

  const notes = filterNotes(props.notes, search);
  return (
    <NoteListWrapper className="isoNoteListWrapper">
      <InputSearch
        placeholder="Search Generations"
        className="isoSearchNotes"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      <div className="isoNoteList">
        {notes && notes.length > 0 ? (
          <Scrollbars style={{ height: "calc(100vh - 70px)" }}>
            {notes.map(note => singleNote(note))}
          </Scrollbars>
        ) : (
          <span className="isoNoResultMsg">No note found</span>
        )}
      </div>
    </NoteListWrapper>
  );
}
