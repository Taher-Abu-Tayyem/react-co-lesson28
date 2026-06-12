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
import { useTranslation } from "react-i18next";
export default function Navbar() {
  const { t, i18n } = useTranslation();

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
                  <NavLink to="/signin">{t("signin")}</NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink to="/signup">{t("signup")}</NavLink>
                </li>
              )}
              {user && (
              <>  <li>
                  <NavLink to="/about">{t("about")}</NavLink>
                </li>
              
               <li>
                  <NavLink to="/services">{t("services")}</NavLink>
                </li>
              
               <li>
                <NavLink to="/Tasks">{t("task")}</NavLink>
              </li></> )}
              <li className="main-list lang">
                <p>{t("lang")}</p> 
                <ul  className="drop-menu ">
                  <li onClick={() => i18n.changeLanguage("en")}>
                    {i18n.language === "en" && <i className="fas fa-solid fa-check"></i>} English
                  </li>
                  <li onClick={() => i18n.changeLanguage("ar")}>
                    {i18n.language === "ar" && <i className="fas fa-solid fa-check"></i>} العربية
                  </li>
                  <li onClick={() => i18n.changeLanguage("fr")}>
                    {i18n.language === "fr" && <i className="fas fa-solid fa-check"></i>} French
                  </li>
                </ul>
              </li>
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
                  <NavLink to="/signin">{t("signout")}</NavLink>
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
