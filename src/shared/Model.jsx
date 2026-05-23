import { Helmet } from "react-helmet-async";
import "./Model.css";
export default function Model({closeModel, children}) {
  return (
<div className="parent-model">
    <Helmet>
          <title>Model Page</title>
        </Helmet>
  <form className={`model`}>
            <div
              className="close"
              onClick={() => {
            closeModel()
              }}
            >
              X
            </div>
            {children}
            
          </form>
</div>
  )
}