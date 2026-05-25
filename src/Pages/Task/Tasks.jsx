import React, { useEffect, useState } from "react";
import "./Tasks.css";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Model from "shared/Model";
import { doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
import { auth, db } from "../../FireBase/Config";
import TaskModel from "./TaskModel";

export default function Tasks() {
  const [user, loading, error] = useAuthState(auth);

  const [showModel, setShowModel] = useState(false);
  const [title, setTitle] = useState("");
  const [subTask, setSubTask] = useState("");
  const [array, setArray] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const closeModel = () => setShowModel(false);

  const addBTN = (e) => {
    e.preventDefault();
    if(!array.includes(subTask)){
      array.push(subTask);
    }
    
    console.log(array);
    setSubTask("");
  };
  const titleinput = (e) => {
    setTitle(e.target.value);
  };
  const detailsinput = (e) => {
    setSubTask(e.target.value);
  };
  const submitBTN = async (eo) => {
    eo.preventDefault();
    setShowLoading(true);
    const idTask = new Date().getTime();
    await setDoc(doc(db, user.uid, `${idTask}`), {
      id: idTask,
      titleTask: title,
      details: array,
    });
    setShowLoading(false);
    setArray([]);
    setTitle("");
    setShowModel(false);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    console.log("done");
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

              <button className="add-task" onClick={() => setShowModel(true)}>
                Add Task <i className="fa fa-solid fa-plus"></i>
              </button>
              <p
                className="success-message"
                style={{ right: showMessage ? "10vw" : "100vw" }}
              >
                Task added successfully !{" "}
                <i className="fa fa-solid fa-check"></i>
              </p>

              {showModel && (
                <TaskModel closeModel={closeModel} title={title} subTask={subTask} array={array} showLoading={showLoading} addBTN={addBTN} titleinput={titleinput} detailsinput={detailsinput} submitBTN={submitBTN} />
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
