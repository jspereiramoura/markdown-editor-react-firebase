import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  setDoc,
  updateDoc
} from "firebase/firestore";
import getFirebase from "../config/firebase";
import debounce from "../functions/debounce";

export default class NoteService {
  private db;
  private userId?: string;
  private debounce: Function;

  constructor() {
    const app = getFirebase();

    this.debounce = debounce(500);
    this.db = app.db;
    this.userId =
      app.auth.currentUser?.uid ?? localStorage.getItem("loggedInUid");
  }

  async getNotes() {
    if (!this.userId) return console.error("No id has founded");

    const markdownsCol = collection(this.db, "users", this.userId, "notes");
    const { docs } = await getDocs(markdownsCol);

    return docs.map(doc => doc.id);
  }

  async updateNotesLength(n: number) {
    if (!this.userId) return console.error("No id has founded");

    const userRef = doc(this.db, `users/${this.userId}`);
    const docData = (await getDoc(userRef)).data();

    (docData?.count ? updateDoc : setDoc)(userRef, {
      count: increment(n)
    });
  }

  async createNote() {
    if (!this.userId) return console.error("No id has founded");

    const markdownsCol = collection(this.db, "users", this.userId, "notes");
    const docRef = doc(markdownsCol, crypto.randomUUID());

    return getDocs(markdownsCol).then(({ docs }) => {
      if (docs.length < 2) {
        setDoc(docRef, {
          html: "",
          markdown: ""
        }).then(() => {
          this.updateNotesLength(1);
        });

        return docRef.id;
      } else {
        alert(
          "Unfortunately, this is a sample project and it's not possible to create more than 2 notes :("
        );
      }
    });
  }

  updateNote(noteId: string, data: { html: string; markdown: string }) {
    const docRef = doc(this.db, `users/${this.userId}/notes/${noteId}`);
    this.debounce(async () => {
      updateDoc(docRef, data);
    });
  }

  async noteById(id: string) {
    const docRef = doc(this.db, `users/${this.userId}/notes/${id}`);
    return (await getDoc(docRef)).data();
  }

  deleteNoteById(id: string) {
    const docRef = doc(this.db, `users/${this.userId}/notes/${id}`);
    deleteDoc(docRef).then(() => {
      this.updateNotesLength(-1);
    });
  }

  onUserNotesUpdate(fn: (notes: string[]) => void) {
    onSnapshot(collection(this.db, `users/${this.userId}/notes`), snap => {
      fn(snap.docs.map(doc => doc.id));
    });
  }

  onNotesUpdate(
    noteId: string,
    fn: (note?: { html: string; markdown: string }) => void
  ) {
    onSnapshot(doc(this.db, `users/${this.userId}/notes/${noteId}`), snap => {
      fn(snap.data() as any);
    });
  }
}
