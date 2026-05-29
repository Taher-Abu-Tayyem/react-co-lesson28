import React, { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import {  arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from '../../FireBase/Config';
import Moment from 'react-moment';
import "./EditTask.css";
export default function SubTaskSection({user,id,completedCheckBox,trashIcon}) {
const [value, loading, error] = useDocument(doc(db, user.uid, id));
    const [showAddTask, setShowAddTask] = useState(false);
    const [subTask, setSubTask] = useState("");    if (loading) {
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
      <section className="sub-task mtt">
          <div className="parent-time">
            <p className="time"><Moment fromNow date={value.data().id} /></p>
            <div>
              <input onChange={async (e) => await completedCheckBox(e)} checked={value.data().completed} id="checkbox" type="checkbox" />
              <label htmlFor="checkbox">Completed </label>
            </div>
          </div>

          <ul>
            {value.data().details.map((item, index) => {
              return <>
              <li className="card-task flex" key={index}>
              <p> {item} </p>
              <i onClick={async () => await trashIcon(item)} className="fas fa-trash"></i>
            </li>
              </>;
            })}

            
          </ul>
         { showAddTask && <div className="add-new-task">
            <input onChange={(eo) => {
              setSubTask(eo.target.value)
            }
            } className="add-task" type="text" value={subTask}/>
            <button className="cancel" onClick={() => {
              setShowAddTask(false);
            }
            }>Cancle</button>
            <button className="add" onClick={async () => {
              await updateDoc(doc(db, user.uid, id), {
details: arrayUnion(subTask),
});

            }
            }>Add</button>
          </div>}
          <div>
            <button className="add-more-btn mt" onClick={() => {
              setShowAddTask(true);
            }
            }>
              Add more <i className="fas fa-plus"></i>
            </button>
          </div>

        </section>
  )
}
}