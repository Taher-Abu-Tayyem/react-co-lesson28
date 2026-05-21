import React from 'react'
import Navbar from './Navbar'

import {useContext } from "react";
import Data from "../context/Data";
import { FaRegSun } from 'react-icons/fa';
import { MdNightlight } from 'react-icons/md';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../FireBase/Config';
import { Link } from 'react-router-dom';


export default function Content(data) {
    const {theme, changeTheme} = useContext(Data);
    const [user, loading, error] = useAuthState(auth);
    

  return (
    <div className=''   >
      <Navbar />
      {user ? 
      <div className='content-home'>
        
      <h3>{data.title || "Default"}-Page</h3>
      <p>{data.description || "Default description"}</p>
      </div> : <h1  className='content-home'><Link style={{color:"skyblue"} }to="/signin">Sign In</Link> to continue</h1>}  
    </div>
  )
}
