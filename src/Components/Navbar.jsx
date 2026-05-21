import React from "react";
import { FaRegSun } from "react-icons/fa";
import { MdNightlight } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import "../theme.css";

import { useContext } from "react";
import Data from "../context/Data";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FireBase/Config";
import { signOut } from "firebase/auth";
export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const { theme, changeTheme } = useContext(Data);

  return (
    <div>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            Modern Musician
          </Link>
          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <button
            onClick={() => {
              changeTheme(theme === "light" ? "dark" : "light");
            }}
          >
            {theme === "light" ? <MdNightlight /> : <FaRegSun />}{" "}
          </button>

          <nav className="nav" id="nav">
            <ul className="nav-list">
              {!user && (
                <li>
                  <NavLink to="/signin">SignIn</NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink to="/signup">Go to SignUp</NavLink>
                </li>
              )}
              {user && (
              <>  <li>
                  <NavLink to="/about">Go to About</NavLink>
                </li>
              
               <li>
                  <NavLink to="/services">Go to Services</NavLink>
                </li>
              
              <li>
                <NavLink to="/Tasks">Go to Tasks</NavLink>
              </li></> )}
              {user && (
                <li
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        // Sign-out successful.
                        console.log("Sign-out successful.");
                      })
                      .catch((error) => {
                        // An error happened.
                        console.error("Error signing out: ", error);
                      });
                  }}
                >
                  <NavLink to="/signin">Sign Out</NavLink>
                </li>
              )}
              <li>{user? <NavLink to="/Data">{user.displayName}</NavLink> : "Guest"}</li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
