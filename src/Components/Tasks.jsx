import React, { useEffect, useState } from "react";
import "./Tasks.css";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Model from "shared/Model";
import { doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
import { auth, db } from "../FireBase/Config";

export default function Tasks() {
  const [user, loading, error] = useAuthState(auth);

  const [showModel, setShowModel] = useState(false);
  const [title, setTitle] = useState("");
  const [subTask, setSubTask] = useState("");
  const [array, setArray] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const closeModel = () => setShowModel(false);

  const addBTN = () => {
    setArray((prev) => [...prev, subTask]);
    setSubTask("");
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/Content");
    }
    if (user && !user.emailVerified) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Initialising User...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-red-500">
          Error: {error.message}
        </h1>
      </div>
    );
  }

  if (user && user.emailVerified) {
    return (
      <>
        <Helmet>
          <title>Tasks Page</title>
          <meta name="description" content="Web site Tasks description" />
        </Helmet>

        <Navbar />

        <main className="task">
          <section className="layout">
            {/* filtered data */}
            <section className="btns flex">
              <select id="options">
                <option value="">All Tasks</option>
                <option value="">Completed</option>
                <option value="">Not Completed</option>
              </select>

              <button>Newest first</button>
              <button>Oldest first</button>

              <button
                className="add-task"
                onClick={() => setShowModel(true)}
              >
                Add Task <i className="fa fa-solid fa-plus"></i>
              </button>

              {showModel && (
                <Model closeModel={closeModel}>
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <div>
                    <input
                      placeholder="Sub Task"
                      value={subTask}
                      onChange={(e) => setSubTask(e.target.value)}
                    />

                    <button
                      className="add-task"
                      onClick={(e) => {
                        e.preventDefault();
                        addBTN();
                      }}
                    >
                      Add Sub Task
                    </button>
                  </div>

                  <ul>
                    {array.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <button
                    className="add-task"
  onClick={async () => {
  try {
    console.log("START");

    const ref = doc(db, "test", "123");

    console.log(ref);

    await setDoc(ref, {
      name: "Taher",
      time: Date.now(),
    });

    console.log("SUCCESS");

  } catch (err) {
    console.error("FIREBASE ERROR:", err);
  }
}}
                    
                  >
                    {showLoading ? (
                      <ReactLoading
                        type={"spokes"}
                        color={"white"}
                        height={20}
                        width={20}
                      />
                    ) : (
                      "Add Task"
                    )}
                  </button>
                </Model>
              )}
            </section>

            {/* tasks list */}
            <section className="tasks-wrapper">
              <section className="flex all-task">
                <article dir="auto" className="one-task">
                  <Link to="/EditTask">
                    <h2>New Tasks</h2>
                    <ul>
                      <li>Sub task1</li>
                      <li>Sub task2</li>
                      <p className="time">a day ago</p>
                    </ul>
                  </Link>
                </article>
              </section>
            </section>
          </section>
        </main>
      </>
    );
  }

  return null;
}