import React from "react";
import Navbar from "./Navbar";



import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FireBase/Config";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { deleteUser } from "firebase/auth";

export default function Content(data) {
  const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();

    const deleteAccount = (eo) => {
      deleteUser(user)
                  .then(() => {
                    console.log("User deleted");

                    return navigate("/");
                    // User deleted.
                    
                  })
                  .catch((error) => {
                    // An error ocurred
                    // ...
                  });
      
    }
    

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
        <h1 className="text-2xl font-bold text-red-500">Error: {error}</h1>
      </div>
    );
  }
  if (user) {
    return (
      <div className="">
        <Navbar />
        {user ? (
          <div className="content-home">
            <p>HI {user?.displayName}</p>

            {/* <p>{data.title || "Default"}-Page</p>
      <p>{data.description || "Default description"}</p> */}
            <p>
              creationTime:{" "}
              <Moment fromNow date={user?.metadata?.creationTime} />
            </p>
            <button
              className="btn delete-account-btn"
              onClick={(eo) => {
                deleteAccount(eo)
              }}
            >
              Delete Account
            </button>
          </div>
        ) : (
          <h1 className="content-home">
            <Link style={{ color: "skyblue" }} to="/signin">
              Sign In
            </Link>{" "}
            to continue
          </h1>
        )}
      </div>
    );
  }
}
