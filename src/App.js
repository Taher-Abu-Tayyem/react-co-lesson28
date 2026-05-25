import {createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Tasks from './Pages/Task/Tasks';
import Services from './Components/Services';
import Datta from './Components/Data';



import {useContext } from "react";
import Data from "./context/Data";
import "./theme.css"
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Content from "./Components/Content";
import Error404 from "./Pages/Error404";
import EditTask from "./Pages/EditTask/EditTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />
  },
    {
    path: "/signin",
    element: <SignIn />,
  },  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Tasks",
    element: <Tasks />,
  },
  {
    path: "/Services",
    element: <Services />,
  },{
    path: "/content",
    element: <Content />,
  },
  {
    path: "/Data",
    element: <Datta />,
  },  {
    path: "/EditTask",
    element: <EditTask />,
  },
   {
    path: "*",
    element: <Error404 />,
  },
]);

console.log("App.js is running");
function App() {
  const {theme} = useContext(Data);
  
  return (
  <div>
        <div className={`${theme}`}> 
          <RouterProvider router={router} />
        </div>
  </div>
  );
}

export default App;
