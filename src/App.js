import React, { Component } from "react";
import Heading from "./heading.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    searchText: "",
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
      },
    ],
  };

  componentDidUpdate() {
    const savedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotes);
  }

  componentDidMount() {
    const savedNotes = localStorage.getItem("savedNotes");
    if (savedNotes) {
      this.setState({ notes: JSON.parse(savedNotes) });
    }
  }

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    const newNotes = [...this.state.notes, newNote];
    this.setState({ notes: newNotes });
  };

  onSearch = (searchValue) => {
    if (searchValue === "") {
      const updatedNotes = this.state.notes.map((note) => {
        return { ...note, doesMatchSearch: true };
      });
      this.setState({ notes: updatedNotes, searchText: "" });
    } else {
      const filteredNotes = this.state.notes.map((note) => {
        if (
          note.title.toLowerCase().includes(searchValue) ||
          note.description.toLowerCase().includes(searchValue)
        ) {
          return { ...note, doesMatchSearch: true };
        } else {
          return { ...note, doesMatchSearch: false };
        }
      });
      this.setState({ notes: filteredNotes, searchText: searchValue });
    }
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    const newNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          return { ...note, title: updatedValue };
        } else if (updatedKey === "description") {
          return { ...note, description: updatedValue };
        }
      }
    });
    this.setState({ notes: newNotes });
  };

  deleteNote = (deleteMeId) => {
    const newNotes = this.state.notes.filter((note) => {
      if (note.id !== deleteMeId) {
        return note;
      }
    });
    this.setState({ notes: newNotes });
  };

  render() {
    return (
      <div>
        <Heading
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default App;
