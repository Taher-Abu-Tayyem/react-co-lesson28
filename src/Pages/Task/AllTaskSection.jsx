import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../FireBase/Config.jsx";

import Moment from "react-moment";
import { useState } from "react";
export default function AllTaskSection({ user }) {
  const [fullOpacity, setfullOpacity] = useState(false);
  const [data, setData] = useState(
 query(collection(db, user.uid), orderBy("id"))
  );
  const [value, loading, error] = useCollection(data);

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
      <>
        <section className="btns flex">
          <select onChange={(eo) => {
            console.log(eo.target.value);
            if (eo.target.value === "a") {
              setData(query(collection(db, user.uid),where("completed", "==", false), orderBy("id")))
            }else if (eo.target.value === "b") {
              setData(query(collection(db, user.uid),where("completed", "==", true), orderBy("id")))
            }else if (eo.target.value === "c") {
              setData(query(collection(db, user.uid),where("completed", "==", false), orderBy("id")))
            }
          }
          } id="options">
            <option value="a">All Tasks</option>
            <option value="b">Completed</option>
            <option value="c">Not Completed</option>
          </select>

          <button
            style={{ opacity: fullOpacity ? 0.5 : 1 }}
            onClick={() => {
              setfullOpacity(true);
              setData(
                query(
                  collection(db, user.uid),
                  orderBy("id", "desc"),
                  limit(3),
                ),
              );
            }}
          >
            {" "}
            Newest first
          </button>
          <button
            style={{ opacity: fullOpacity ? 1 : 0.5 }}
            onClick={() => {
              setfullOpacity(false);
              setData(
                query(collection(db, user.uid), orderBy("id", "asc"), limit(3)),
              );
            }}
          >
            Oldest first
          </button>
        </section>

        <section className="all-task">
          {value.docs.length === 0 && (
            <h1>Gongratulation you have no tasks.</h1>
          )}
          {value.docs.map((item) => {
            return (
              <article key={item.id} dir="auto" className="one-task">
                <Link className="task-link" to={`/EditTask/${item.data().id}`}>
                  <h2>{item.data().titleTask}</h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={index}>{item}</li>;
                      }
                    })}
                  </ul>
                  <p className="time">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </>
    );
  }
}
