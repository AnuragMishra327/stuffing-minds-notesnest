import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function PaymentModal({ note, onClose }) {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [transactionId, setTransactionId] = useState("");
const submitPayment = async () => {

  if (!name || !email || !transactionId) {
    alert("Please fill all the fields.");
    return;
  }

  try {

    await addDoc(collection(db, "paymentRequests"), {
  name: name,
  email: email,
  transactionId: transactionId,
  noteId: note.id,
  subject: note.subject,
  title: note.title,
  price: note.price,
  pdf: note.pdf,
  status: "pending",
  createdAt: new Date()
});

    alert("Payment request submitted. We will verify your payment shortly.");

    onClose();

  } catch (error) {

    console.error(error);
    alert("Something went wrong. Please try again.");

  }
};

  return (
    <div className="modal-overlay">

      <div className="payment-modal">

        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <h2>Buy Notes</h2>

        <h3>{note.subject}</h3>

        <p>{note.title}</p>

        <div className="price">
          ₹{note.price}
        </div>

        <p className="payment-text">
          Scan the QR code below and pay ₹{note.price}
        </p>

        <img
          src="/upi-qr.png"
          alt="UPI QR Code"
          className="upi-qr"
        />

        <p className="payment-text">
          After completing the payment, click the button below.
        </p>

        <button
  className="payment-button"
  onClick={() => setShowForm(true)}
>
  I HAVE PAID
</button>
{showForm && (
  <div className="payment-form">

    <h3>Payment Confirmation</h3>

    <input
  type="text"
  placeholder="Your Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

    <input
  type="email"
  placeholder="Your Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

    <input
  type="text"
  placeholder="Transaction ID"
  value={transactionId}
  onChange={(e) => setTransactionId(e.target.value)}
/>

    <button
  className="payment-button"
  onClick={submitPayment}
>
  SUBMIT PAYMENT
</button>

  </div>
)}

      </div>

    </div>
  );
}

export default PaymentModal;