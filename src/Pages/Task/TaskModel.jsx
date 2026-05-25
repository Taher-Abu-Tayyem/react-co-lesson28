import React, { useState } from "react";
import ReactLoading from "react-loading";
import Model from "shared/Model";

export default function TaskModel({
  closeModel,
  title,
  subTask,
  array,
  showLoading,
  addBTN,
  titleinput,
  detailsinput,
  submitBTN,
}) {
  return (
    <Model closeModel={closeModel}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => titleinput(e)}
      />

      <div>
        <input
          placeholder="Sub Task"
          value={subTask}
          onChange={(e) => detailsinput(e)}
        />

        <button
          className="add-task"
          onClick={(e) => {
            addBTN(e);
          }}
        >
          Add Sub Task
        </button>
      </div>

      <ul>
        {array.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <button
        className="add-task"
        onClick={(eo) => {
          submitBTN(eo);
        }}
      >
        {showLoading ? (
          <ReactLoading
            type={"spokes"}
            color={"white"}
            height={20}
            width={20}
          />
        ) : (
          "Add Task"
        )}
      </button>
    </Model>
  );
}
