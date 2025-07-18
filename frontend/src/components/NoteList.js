// src/components/NoteList.js
import React from "react";

const NoteList = ({ notes, onDelete }) => {
  return (
    <div>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => onDelete(note._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
