import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../FireBase/Config";
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router";
import "./SignIn.css";
import { divide } from "firebase/firestore/pipelines";
import Model from "shared/Model";

export default function SignIn() {
  const [user] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [errorr, setErrorr] = useState(null);
  const [resetEmail, setResetEmail] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const closeModel = () => {
    setShowModel(false);
  }
  


const signInBTN = (eo) => {
  eo.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...

      console.log("User signed in successfully:", user);
      navigate("/"); // Navigate to the home page after successful sign-in
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error signing in: ", errorMessage);
      setErrorr(errorCode);

      switch (errorCode) {
        case "auth/invalid-email":
          setErrorr("Invalid email.");
          break;
        case "auth/invalid-credential":
          setErrorr("Wrong password.");
          break;
        case "auth/too-many-requests":
          setErrorr("Too many requests. Please try again later.");
          break;
        case "auth/missing-password":
          setErrorr("The password is missing.");
          break;
        default:
          setErrorr("An error occurred. Please try again.");
      }
    });
};

const resetPasswordBTN = (eo) => {
  eo.preventDefault();
              // Handle password reset logic here
              setResetEmail(true);
              sendPasswordResetEmail(auth,resetPassword)
                .then(() => {
                  // Password reset email sent!
                  // ..
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // ..
                  console.log("Error sending password reset email: ", errorMessage);
                });
            };

  return (
    <>
      <Helmet>
        <title>SignIn Page</title>
        <meta name="description" content="Web site SIGNIN description" />
      </Helmet>

      <Navbar />
      

      <main className="content-home">
        <form>
          <input
            onChange={(eo) => {
              setEmail(eo.target.value);
            }}
            type="email"
            placeholder="Email"
            required
          />
          <input
            onChange={(eo) => {
              setPassword(eo.target.value);
            }}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            onClick={(e) => {
              signInBTN(e);
            }}
          >
            Sign In
          </button>
          <Link to="/signup">
            <p className="account">Sign Up</p>
          </Link>
          <p
            className="reset-text"
            onClick={(e) => {
              e.preventDefault();
              setShowModel(true);
            }}
          >
            Forgot Password?
          </p>

          {errorr && <span style={{ color: "red" }}>{errorr}</span>}
        </form>

        {showModel &&(
        <Model closeModel={closeModel} >
           <h2>Reset Password</h2>
          <input
            onChange={(eo) => {
              setResetPassword(eo.target.value);
            }}
            type="email"
            placeholder="Enter your email" ></input>        
          <button
            onClick={(eo) => {
              resetPasswordBTN(eo);
            }}
          >
            Send Reset Email
          </button>
        </Model>
        )}
      
        
      </main>
    </>
  );
}
