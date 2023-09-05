import React from "react";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

const Task = (props) => {
  const { taskName, isDone, id } = props.task;
  const { handleRomoveTask, handleDoneTask } = props;
  return (
    <div className="d-flex justify-content-between border-3 border-dark border-bottom py-4">
      <h3 className={`h3 ${isDone ? "text-success" : ""}`}>{taskName}</h3>
      <div className="d-flex">
        <CheckOutlined
          style={{
            fontSize: 25,
            marginRight: 30,
            cursor: "pointer",
          }}
          onClick={() => {
            handleDoneTask(id);
          }}
        />
        <DeleteOutlined
          style={{ fontSize: 25, cursor: "pointer" }}
          onClick={() => {
            handleRomoveTask(id);
          }}
        />
      </div>
    </div>
  );
};

export default Task;
