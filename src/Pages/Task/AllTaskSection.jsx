import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../FireBase/Config.jsx";

import Moment from "react-moment";
export default function AllTaskSection({ user }) {
  const [value, loading, error] = useCollection(collection(db, user.uid));
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
      <section className="all-task">
        {value.docs.map((item) => {
          return (
            <article key={item.id} dir="auto" className="one-task">
              <Link to={`/EditTask/${item.data().id}`}>
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
    );
  }
}
