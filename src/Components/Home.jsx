import { Helmet } from "react-helmet-async";
import "../App.css";
import Content from "./Content";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FireBase/Config";
import Navbar from "./Navbar";
import { sendEmailVerification } from "firebase/auth";
/* 
import {useContext } from "react";
import Data from "../context/Data"; */

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  let navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/Content");
    }
  });

  if (loading) {
    return (
      <div className="content-home">
        <h1 className="text-2xl font-bold">Initialising User...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="content-home">
          <h1 className="content-home">
            <Link style={{ color: "skyblue" }} to="/signin">
              Sign In
            </Link>{" "}
            to continue
          </h1>
        </div>
      </>
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
            <button
              className="delete-account-btn"
              onClick={() => {
                sendEmailVerification(auth.currentUser);
                console.log("Verification email sent");
              }}
            >
              Resend Verification Email
            </button>
          </div>
        </>
      );
    }
    if (user.emailVerified) {
      return (
        <>
          <Navbar />
        <div className="content-home">
          <h1 className="text-2xl font-bold">Welcome, {user.displayName}!</h1>
        </div>
        </>
      );
    }
  }
  return (
    <div>
      <Helmet>
        <title>ِApp Page</title>
      </Helmet>

      <Content
        title="Welcome to Our App"
        description="Discover amazing features!"
      />
    </div>
  );
}
