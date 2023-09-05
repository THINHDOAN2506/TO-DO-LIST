import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";

const InnputFormTask = (props) => {
  const { handleAddTask } = props;
  const [inputTaskName, setInputTaskName] = useState("");

  const handleChangeTaskName = (event) => {
    setInputTaskName(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (!inputTaskName) return;
    handleAddTask(inputTaskName);
    setInputTaskName("");
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <h1 className=" h1 mt-3 fw-bold" style={{ textAlign: "center" }}>
        TO DO LIST APPLICATION
      </h1>
      <div className="d-flex my-4">
        <Input
          placeholder="Add new task in here"
          value={inputTaskName}
          onChange={handleChangeTaskName}
          style={{ marginRight: 20 }}
        />
        <button type="submit" style={{ border: "none" }} className="bg-warning">
          <PlusCircleOutlined style={{ fontSize: 30, cursor: "pointer" }} />
        </button>
      </div>
    </form>
  );
};

export default InnputFormTask;
