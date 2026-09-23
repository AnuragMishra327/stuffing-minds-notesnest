import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { db, auth } from "./firebase";

function Admin() {

  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {

   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

  if (currentUser) {

    if (currentUser.email !== "2k24.cs1e.2414327@gmail.com") {

      alert("You are not authorized to access the Admin panel.");

      await signOut(auth);

      setUser(null);

      return;
    }
  }

  setUser(currentUser);

});

    return () => unsubscribe();

  }, []);

  const login = async () => {

  const provider = new GoogleAuthProvider();

  try {

    const result = await signInWithPopup(auth, provider);

    if (result.user.email !== "2k24.cs1e.2414327@gmail.com") {

      alert("You are not authorized to access the Admin panel.");

      await signOut(auth);

      return;
    }

  } catch (error) {

    console.error(error);

  }

};

  const logout = async () => {
    await signOut(auth);
  };

  const fetchRequests = async () => {

    const requestsQuery = query(
  collection(db, "paymentRequests"),
  orderBy("createdAt", "desc")
);

const querySnapshot = await getDocs(requestsQuery);

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setRequests(data);
  };

  useEffect(() => {

    if (user) {
      fetchRequests();
    }

  }, [user]);

  const updateStatus = async (id, status) => {

    await updateDoc(
      doc(db, "paymentRequests", id),
      { status: status }
    );

    fetchRequests();
  };

  if (!user) {

    return (
      <div className="admin-page">

        <h1>Stuffing Minds NotesNest</h1>

        <h2>Admin Login</h2>

        <button onClick={login}>
          LOGIN WITH GOOGLE
        </button>

      </div>
    );

  }

  return (
    <div className="admin-page">

      <h1>Stuffing Minds NotesNest</h1>

      <h2>Payment Requests</h2>

      <p>Logged in as: {user.email}</p>

      <button onClick={logout}>
        LOGOUT
      </button>

      {requests.length === 0 && (
        <p>No payment requests found.</p>
      )}

      {requests.map((request) => (

        <div className="request-card" key={request.id}>

          <h3>{request.name}</h3>

          <p>
            <strong>Note:</strong> {request.subject}
          </p>

          <p>
            <strong>Title:</strong> {request.title}
          </p>

          <p>
            <strong>Amount:</strong> ₹{request.price}
          </p>

          <p>
            <strong>Email:</strong> {request.email}
          </p>

          <p>
            <strong>Transaction ID:</strong> {request.transactionId}
          </p>

          <p>
            <strong>Status:</strong> {request.status}
          </p>

          {request.status === "pending" && (
            <div>

              <button
                onClick={() => updateStatus(request.id, "approved")}
              >
                APPROVE
              </button>

              <button
                onClick={() => updateStatus(request.id, "rejected")}
              >
                REJECT
              </button>

            </div>
          )}

        </div>

      ))}

    </div>
  );
}

export default Admin;