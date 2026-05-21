import React, { useEffect, useState } from "react";
import "./Tasks.css";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FireBase/Config";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Model from "shared/Model";

export default function Tasks() {
  const [user, loading, error] = useAuthState(auth);
  
  const [showModel, setShowModel] = useState(false);
    const closeModel = () => {
    setShowModel(false);
  }
  
  
  let navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/Content");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

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
        <h1 className="text-2xl font-bold text-red-500">Error: {error.message}</h1>
      </div>
    );
  }
  if (user) {
    if (user.emailVerified) {
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
      <Link to="/AddTask">
        <button className="add-task"   onClick={(e) => {
              e.preventDefault();
              setShowModel(true);
            }}>Add Task <i className="fa fa-solid fa-plus"></i></button>
      </Link>
      {showModel && (
        <Model closeModel={closeModel}>
          <input type="text" placeholder="Task Title" />
          <div>
            <input placeholder="Sub Task"></input>
          <button className="add-task" onClick={(e) => {
              e.preventDefault();
            
          }
          }>Add Sub Task</button>
          </div>
          <button className="add-task" onClick={(e) => {
              e.preventDefault();
            
          }
          }>Add Task</button>
        </Model>
       )} 
  </section>
  
  
  <section className="tasks-wrapper">
              {/* all tasks */}
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
  }
}
