import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get("http://localhost:4000/api/notes");
      console.log(res);
      setNotes(res.data);
    };
    getNotes();
  }, []);

  async function deleteNote(noteId) {
    const res = await axios.delete("http://localhost:4000/api/notes/" + noteId);
    if (res.status === 204)
      setNotes([...notes.filter((note) => note._id !== noteId)]);
  }

  return (
    <div className="row">
      {notes.map((note) => (
        <div className="col-md-4 p-2" key={note._id}>
          <div className="card rounded-0">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>{note.title}</h5>
              <Link to={"/edit/" + note._id} className="btn btn-sm">
                <i className="material-icons">border_color</i>
              </Link>
            </div>
            <div className="card-body">
              <p>{note.content}</p>
              <p>Author: {note.author}</p>
              {/* <p>{format(note.createdAt)}</p> */}
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
