import React from "react";

const Note = (props) => {
  const updateTitle = (event) => {
    props.onType(props.note.id, "title", event.target.value);
  };
  const updateDescription = (event) => {
    props.onType(props.note.id, "description", event.target.value);
  };
  const remove = (event) => {
    props.deleteNote(props.note.id);
    console.log(props.note.id);
  };
  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={remove}>
        X
      </span>
    </li>
  );
};

export default Note;
