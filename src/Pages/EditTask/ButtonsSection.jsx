import React from 'react' 
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from "firebase/firestore";
import { db } from '../../FireBase/Config';
import { useNavigate } from 'react-router';

export default function ButtonsSection({user,id,deleteBtn}) {
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
    
  <section className="center mtt">
          
          <div>
            <button className="delete" onClick={() => {
              deleteBtn();
            }
            }>
              Delete task
            </button>
          </div>
        </section>
    
  )
}}
  