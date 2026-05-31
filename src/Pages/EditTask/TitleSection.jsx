import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../FireBase/Config";
export default function TitleSection({ user, id, titleInput }) {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));

  if (loading) {
    return (
      <div>
        <main>
          <p>loading...</p>
        </main>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <main>
          <p>Error: {error.message}</p>
        </main>
      </div>
    );
  }
  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
            value={value.data().titleTask || ""}
            className="title-input center"
            type="text"
            onChange={async (e) => {
              titleInput(e);  
            }}
          />
          <i className="fas fa-edit"></i>
          <button className="btn delete" onClick={
            async (e) => {             await updateDoc(doc(db, user.uid, id), {
            titleTask: deleteField()
});

            }}>
            Delete
          </button>
        </h1>
      </section>
    );
  }
}
