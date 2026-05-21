import React from 'react'
import "./Model.css"
export default function Model({closeModel,children}) {
  return (
      
        <div className="parent-model">
          <form className={`model`}>
          <div
            className="close"
            onClick={(e) => {
              console.log("close form");
               closeModel();
             }}
          >
            X
          </div>

        {children}
        </form>
        </div>
        
  )
}
