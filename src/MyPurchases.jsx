import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { db, auth } from "./firebase";

function MyPurchases() {

  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();

  }, []);

  const login = async () => {

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }

  };

  const logout = async () => {
    await signOut(auth);
  };

const fetchPurchases = async () => {

  if (!user) return;

  try {

    const purchasesQuery = query(
  collection(db, "paymentRequests"),
  where("email", "==", user.email)
);

    const querySnapshot = await getDocs(purchasesQuery);


    const data = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(
        purchase =>
          purchase.email.trim().toLowerCase() ===
            user.email.trim().toLowerCase() &&
          purchase.status === "approved"
      );

    setPurchases(data);

  }catch (error) {
  console.error(error);
}
};

  useEffect(() => {

    if (user) {
      fetchPurchases();
    }

  }, [user]);

  if (!user) {

    return (
      <div className="purchases-page">

        <h1>My Purchases</h1>

        <p>
          Login with Google to see your purchased notes.
        </p>

        <button onClick={login}>
          LOGIN WITH GOOGLE
        </button>

      </div>
    );

  }

  return (
    <div className="purchases-page">

      <h1>My Purchases</h1>

      <p>
        Logged in as: {user.email}
      </p>

      <button onClick={logout}>
        LOGOUT
      </button>

      {purchases.length === 0 && (
        <p>
          No approved purchases found.
        </p>
      )}

      {purchases.map((purchase) => (

        <div className="purchase-card" key={purchase.id}>

          <h2>{purchase.subject}</h2>

          <p>{purchase.title}</p>
          <p>PDF: {purchase.pdf}</p>

          <p>
            Status: <strong>Approved</strong>
          </p>

          <a
            href={`/pdfs/${purchase.pdf}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            OPEN PDF
          </a>

        </div>

      ))}

    </div>
  );
}

export default MyPurchases;