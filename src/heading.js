import React from "react";

function Heading(props) {
  const searchNotes = (event) => {
    const searchValue = event.target.value.toLowerCase();
    props.onSearch(searchValue);
  };
  return (
    <header className="app-header">
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          type="text"
          placeholder="Type here to search..."
          className="search"
          value={props.searchText}
          onChange={searchNotes}
        />
      </aside>
    </header>
  );
}

export default Heading;
