import React, { useRef } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../FireBase/Config";
export default function TitleSection({ user, id, titleInput }) {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const inputElement = useRef(null);

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
            style={{ textDecoration: value.data().completed ? "line-through wavy red" : "none" }}
            ref={inputElement}
            value={value.data().titleTask || ""}
            className="title-input center"
            type="text"
            onChange={async (e) => {
              titleInput(e);  
            }}
          />
          <i className="fas fa-edit" onClick={() => {
            inputElement.current.focus();
          }}></i>
          {/* <button className="btn delete" onClick={
            async (e) => {             await updateDoc(doc(db, user.uid, id), {
            titleTask: deleteField()
});

            }}>
            Delete
          </button> */}
        </h1>
      </section>
    );
  }
}
