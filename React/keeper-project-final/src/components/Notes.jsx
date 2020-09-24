import React from "react";
import Note from "./Note";

const Notes = (props) => {
  return props.notes.map((note, index) => (
    <Note
      key={index}
      id={index}
      title={note.title}
      content={note.content}
      deleteNote={props.deleteNote}
    />
  ));
};

export default Notes;
