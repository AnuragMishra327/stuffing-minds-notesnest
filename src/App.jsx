import Admin from "./Admin";
import MyPurchases from "./MyPurchases";
import { useEffect, useState } from "react";
import PaymentModal from "./components/PaymentModal";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

function App() {

  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  if (window.location.pathname === "/purchases") {
    return <MyPurchases />;
  }

  const [notes, setNotes] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedNote, setSelectedNote] = useState(null);
  useEffect(() => {

  const fetchNotes = async () => {

    const querySnapshot = await getDocs(
      collection(db, "notes")
    );

    const notesData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setNotes(notesData);
  };

  fetchNotes();

}, []);

  const subjects = [
    "All",
    ...new Set(notes.map(note => note.subject))
  ];

  const filteredNotes =
    selectedSubject === "All"
      ? notes
      : notes.filter(note => note.subject === selectedSubject);

  return (
    <div className="app">

      <header className="header">

  <div>
    <h1>Stuffing Minds</h1>
    <span>NotesNest</span>
  </div>

  <div className="header-buttons">

  <a
    href="/purchases"
    className="purchases-link"
  >
    MY PURCHASES
  </a>

  <a
    href="/admin"
    className="admin-link"
  >
    ADMIN
  </a>

</div>

</header>

      <main className="main">

        <h2>AKTU Notes</h2>

        <p className="subtitle">
          Simple and useful notes for AKTU students
        </p>

        <div className="filter">

          <label>Subject:</label>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >

            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}

          </select>

        </div>

        <h3>Available Notes</h3>

        {filteredNotes.map((note, index) => (

          <div className="note-card" key={index}>

            <div>
              <h4>{note.subject}</h4>
              <p>{note.title} • PDF</p>


            </div>

            <div className="note-right">

              <strong>₹{note.price}</strong>

              <button onClick={() => setSelectedNote(note)}>
  BUY NOW
</button>

            </div>

          </div>

        ))}

      </main>

      {selectedNote && (
        <PaymentModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
    </div>
  );
}

export default App;