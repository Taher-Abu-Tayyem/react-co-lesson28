import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import {  doc } from "firebase/firestore";
import { db } from '../../FireBase/Config';
import Moment from 'react-moment';
export default function SubTaskSection({user,id,completedCheckBox}) {
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
              <i className="fas fa-trash"></i>
            </li>
              </>;
            })}

            
          </ul>
      </section>

  )
}}
