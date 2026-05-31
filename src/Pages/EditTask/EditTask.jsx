import "./EditTask.css";

import { Helmet } from "react-helmet-async";
import Navbar from "../../Components/Navbar";
import { auth, db } from "../../FireBase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import TitleSection from "./TitleSection";
import ButtonsSection from "./ButtonsSection";
import SubTaskSection from "./SubTaskSection";
import{ useNavigate, useParams} from "react-router-dom";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useState } from "react";


const EditTask = () => {
    const [user,loading,error] = useAuthState(auth);
    let navigate = useNavigate();
    const[showData, setShowData] = useState(false);

   
   let {StringId} = useParams();
    
   
   const titleInput = async (e) => {
              await updateDoc(doc(db, user.uid, StringId), {
                titleTask: e.target.value,
              });
            }
    const completedCheckBox = async (e) => {
      if(e.target.checked){
        updateDoc(doc(db, user.uid, StringId), {
          completed: true,
        });
      }else{
        await updateDoc(doc(db, user.uid, StringId), {
          completed: false,
        });
      }
    }
    const trashIcon = async (item) => {
      await updateDoc(doc(db, user.uid, StringId), {
        details:arrayRemove(item)
      });
      
    }

      const deleteBtn = async (e) => {
        setShowData(true);
        await deleteDoc(doc(db, user.uid, StringId));
        navigate("/Tasks", { replace: true });
    }
    


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
  if (user) {
      if(user.emailVerified){
    return (
      <div>
      <Helmet>
        <title>Edit Task Pges</title>
      </Helmet>
      <Navbar />
      {showData ?(<main>
          <p>wairing delete...</p>
        </main>): (<div className="edit-task">
       {/* title  */}
       <TitleSection user={user} id={StringId} titleInput={titleInput} />
       {/* sub task */}
       <SubTaskSection user={user} id={StringId} completedCheckBox={completedCheckBox} trashIcon={trashIcon}  />
       {/* buttons */}
       <ButtonsSection user={user} id={StringId} deleteBtn={deleteBtn} />
      </div>)}
    </div>
    )
  }}
}

export default EditTask;
              