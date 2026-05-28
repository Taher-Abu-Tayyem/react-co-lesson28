import "./EditTask.css";

import { Helmet } from "react-helmet-async";
import Navbar from "../../Components/Navbar";
import { auth, db } from "../../FireBase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import TitleSection from "./TitleSection";
import ButtonsSection from "./ButtonsSection";
import SubTaskSection from "./SubTaskSection";
import{useParams} from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";


const EditTask = () => {
   const [user,loading,error] = useAuthState(auth);
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
    const trashIcon = (e) => {
      
    }
    const addMoreBtn = (e) => {
      
    }
    const deleteBtn = (e) => {
      
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
      <div className="edit-task">
       {/* title  */}
       <TitleSection user={user} id={StringId} titleInput={titleInput} />
       {/* sub task */}
       <SubTaskSection user={user} id={StringId} completedCheckBox={completedCheckBox} />
       {/* buttons */}
       <ButtonsSection user={user} id={StringId} />
      </div>
    </div>
    )
  }}
}

export default EditTask;
              