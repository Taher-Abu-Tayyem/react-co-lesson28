import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../FireBase/Config";

import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SignUp() {
  const [userName, setUsername] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [errorr, setErrorr] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  
  useEffect(() => {
      if (user) {
        if (user.emailVerified) {
          navigate("/");
        }
        
      }});
      
      const signUpBTN=(eo)=>{
        
                eo.preventDefault();
                createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;

                    sendEmailVerification(auth.currentUser)
                      .then(() => {
                        // Email verification sent!
                        console.log("Email verification sent successfully.");
                        // ..
                      })
                      
                    updateProfile(auth.currentUser, {
                      displayName: userName,
                      photoURL: "https://example.com/jane-q-user/profile.jpg",
                    })
                      .then(() => {
                        // Profile updated!
                        // ...
                      })
                      .catch((error) => {
                        // An error occurred
                        // ...
                      });
                    // ...
                    console.log("User created successfully:", user);
                    navigate("/"); // Navigate to the sign-in page after successful sign-up
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
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
                    // ..
                  });
      }

  
    if (loading) {
      return (
        <div>
          <h1 className='text-2xl font-bold'>Initialising User...</h1>
        </div>
      );
    }
    if (error) {
      return (
        <div>
          <h1 className='text-2xl font-bold text-red-500'>Error: {error}</h1>
        </div>
      );
    }
  

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
        <Navbar />
        <div className="content-home">
          <h1 className="text-2xl font-bold">
            Please verify your email address
          </h1>
          <button className="delete-account-btn" onClick={() => {
                sendEmailVerification(auth.currentUser);
                console.log("Verification email sent");
              }}>
            Resend Verification Email
          </button>
        </div>
        </>
      );
    }
  }
  if (!user) {
    return (
      <>
        <Helmet>
          <title>SignUp Page</title>
          <meta name="description" content="Web site SIGNUP description" />
        </Helmet>
        <Navbar />
        <main className="content-home">
          <form action="/signup" method="">
            <input
              onChange={(eo) => {
                setUsername(eo.target.value);
              }}
              type="text"
              name="username"
              placeholder="Username"
              required
            />
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
              onClick={(eo) => {
                signUpBTN(eo);
              }}
              type="submit"
            >
              Sign Up
            </button>
            <Link to="/signin">
              <p className="account">Sign In</p>
            </Link>

            {errorr && <span style={{ color: "red" }}>{errorr}</span>}
          </form>
        </main>
      </>
    );
  }
  }
