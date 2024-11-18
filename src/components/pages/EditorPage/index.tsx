import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MarkdownDocument from "../../../models/markdownDocument";
import NoteService from "../../../services/NoteService";
import "./editor.css";

type EditorPageProps = {};

const EditorPage = ({}: EditorPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { current: noteService } = useRef(new NoteService());

  const [text, setText] = useState("");
  const [parsedText, setParsedText] = useState("");

  const { current: renderer } = useRef(new MarkdownDocument());

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!id) return console.error("handleChange: params id not founded");

    const { value } = event.target;

    setText(value);

    renderer.setText(value, (parsed: string) => {
      noteService.updateNote(id, {
        markdown: value,
        html: parsed
      });
    });
  };

  useEffect(() => {
    let mustUpdateState = true;

    if (!id) return navigate("/");

    noteService.onNotesUpdate(id, data => {
      if (!mustUpdateState) return;
      if (data) {
        setParsedText(data.html);
        if (text === "") setText(data.markdown);
      }
    });

    () => {
      mustUpdateState = false;
    };
  });

  return (
    <>
      <section className="flex flex-col h-full gap-4">
        <div>
          <h1 className="text-title">Editor</h1>
          <Link to="/" className="hover:font-bold">Voltar</Link>
        </div>
        <div className="flex flex-grow gap-8 max-h-[90%]">
          <textarea
            value={text}
            onChange={handleChange}
            className="w-full h-full bg-transparent p-2"
          ></textarea>
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: parsedText }}
          />
        </div>
      </section>
    </>
  );
};

export default EditorPage;
