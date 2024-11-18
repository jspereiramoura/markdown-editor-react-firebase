import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteService from "../../../services/NoteService";
import Button from "../../atoms/Button";
import { useAuth } from "../../../stores/contexts/AuthContext";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<any[]>([]);
  const { current: noteService } = useRef(new NoteService());

  const handlerCreateNote = () => {
    const newNoteId = noteService.createNote();
    navigate(`editor/${newNoteId}`);
  };

  const handleDeleteNote = (noteId: string) => {
    noteService.deleteNoteById(noteId);
  };

  useEffect(() => {
    let mustUpdateState = true;

    noteService.onUserNotesUpdate(docIds => {
      if (mustUpdateState) setNotes(docIds);
    });

    return () => {
      mustUpdateState = false;
    };
  }, []);

  return (
    <>
      <section className="flex flex-col h-full justify-between relative">
        <div className="flex flex-col gap-2">
          <h1 className="text-title">Home Page</h1>
          <ul className="flex flex-col gap-2">
            {notes.map(note => (
              <li key={note} className="flex gap-4">
                <Link to={`editor/${note}`}>{note}</Link>
                <button
                  onClick={() => handleDeleteNote(note)}
                  className="text-red-400 hover:font-bold"
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={handlerCreateNote} className="w-full">
          Create New Note
        </Button>
        <Button onClick={logout} className="fixed right-8 h-8 px-2 mt-1">
          Logout
        </Button>
      </section>
    </>
  );
};

export default HomePage;
