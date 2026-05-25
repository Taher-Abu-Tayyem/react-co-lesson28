import "./EditTask.css";

import { Helmet } from "react-helmet-async";
import Navbar from "../../Components/Navbar";
const EditTask = () => {
  return (
    <div>
      <Helmet>
        <title>Edit Task Pges</title>
      </Helmet>
      <Navbar />
      <div className="edit-task">
       {/* title  */}
       <section className="title center">
          <h1>
            <input
              value={"React.js"}
              className="title-input center"
              type="text"
            />
            <i className="fas fa-edit"></i>
          </h1>
        </section>
       {/* sub task */}
       <section className="sub-task mtt">
          <div className="parent-time">
            <p className="time">Created: 10 days ago</p>
            <div>
              <input id="checkbox" type="checkbox" />
              <label htmlFor="checkbox">Completed </label>
            </div>
          </div>

          <ul>
            <li className="card-task flex">
              <p> Sub task 1 </p>
              <i className="fas fa-trash"></i>
            </li>

            <li className="card-task flex">
              <p> Sub task 2 </p>
              <i className="fas fa-trash"></i>
            </li>
          </ul>
        </section>

       {/* buttons */}
       <section className="center mtt">
          <button className="add-more-btn">
            Add more <i className="fas fa-plus"></i>
          </button>

          <div>
            <button className="delete">Delete task</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditTask;