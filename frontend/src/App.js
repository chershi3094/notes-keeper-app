import React, { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setTitle("");
        setContent("");
        setShowForm(false);
        fetchNotes();
      } else {
        alert("Failed to add note.");
      }
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      } else {
        alert("Failed to delete note.");
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Notes Keeper</h1>

      <button style={styles.fab} onClick={() => setShowForm(!showForm)}>
        {showForm ? "➖" : "➕"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Save Note
          </button>
        </form>
      )}

      <div style={styles.grid}>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} style={styles.card}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button
                onClick={() => handleDelete(note._id)}
                style={styles.deleteButton}
              >
                🗑 Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: "960px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    background: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  fab: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "24px",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    color: "red",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default App;
