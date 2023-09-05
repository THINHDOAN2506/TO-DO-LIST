import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import InnputFormTask from "./components/InputFormTask";
import Task from "./components/Task";
import { TaskApi } from "./apis/taskApi";

// const listTask = [
//   { id: 1, taskName: "Di hoc", isDone: false },
//   { id: 2, taskName: "Di lam", isDone: true },
//   { id: 3, taskName: "An ngu ", isDone: false },
//   { id: 4, taskName: "Tam bien", isDone: true },
//   { id: 5, taskName: "Hihi hihi", isDone: false },
// ];

// const KEY_TASK_LIST = "tasks";
// JSON.parse(localStorage.getItem(KEY_TASK_LIST)) ||
// localStorage.setItem(KEY_TASK_LIST, JSON.stringify([_task, ...tasks]));
// localStorage.setItem(KEY_TASK_LIST, JSON.stringify(_tasksList));
// localStorage.setItem(KEY_TASK_LIST, JSON.stringify(_tasksList));

// dataPerPage: [],
// useEffect(() => {
//   if (!tasks.length) {
//     setPagination({
//       ...pagination,
//       dataPerPage: [],
//     });
//   }
//   const _tasksList = [...tasks];
//   const startIndex = (pagination.currentPage - 1) * pagination.limitPerPage;
//   const endIndex = pagination.currentPage * pagination.limitPerPage;
//   const tasksPerPage = _tasksList.slice(startIndex, endIndex);

//   setPagination({
//     ...pagination,
//     dataPerPage: [...tasksPerPage],
//   });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [tasks, pagination.currentPage]);

function App() {
  const [tasks, setTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limitPerPage: 3,
    totalTask: 0,
  });

  const fetchAllTasks = async (params) => {
    setIsLoading(true);
    const response = await TaskApi.getAllTasks(params);
    setTasks(response.data);
    setPagination({
      ...pagination,
      totalTask: response.headers["x-total-count"],
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllTasks({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage]);

  const handleAddTask = async (taskName) => {
    const _task = {
      taskName: taskName,
      isDone: false,
      createAt: new Date().getTime(),
    };

    await TaskApi.createTask(_task);
    fetchAllTasks({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage,
    });
  };

  const renderTaskList = (tasks) => {
    if (!tasks.length) {
      return <div className="text-center">Please input your task...</div>;
    }
    return tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        handleRomoveTask={handleRomoveTask}
        handleDoneTask={handleDoneTask}
      />
    ));
  };

  const handleRomoveTask = async (taskId) => {
    await TaskApi.removeTaskById(taskId);
    fetchAllTasks({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage,
    });
  };

  const handleDoneTask = async (taskId) => {
    const payload = {
      isDone: true,
    };
    await TaskApi.makeDoneTaskById(taskId, payload);
    fetchAllTasks({
      _page: pagination.currentPage,
      _limit: pagination.limitPerPage,
    });
  };

  const handleChangePage = (page) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  console.log(process.env.REACT_APP_BE_URL, "ullll");

  return (
    <div className="App">
      <div className="container mt-5" style={{ width: "50%" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="card border border-5 border-primary rounded-3 bg-warning">
              <div className="card-header p-4 border-3 border-primary">
                <InnputFormTask handleAddTask={handleAddTask} />
              </div>
              <div className="card-body px-4 mb-5">
                {isLoading ? <Spin /> : renderTaskList(tasks)}
              </div>
              <div className="card-footer border-3 border-primary p-4">
                <Pagination
                  style={{
                    padding: 20,
                    display: "flex",
                    justifyContent: "center",
                    WebkitTextFillColor: "blue",
                  }}
                  defaultCurrent={tasks}
                  current={pagination.currentPage}
                  onChange={(page) => handleChangePage(page)}
                  total={pagination.totalTask}
                  pageSize={pagination.limitPerPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// npm install node-sass
// npm install antd
// npm install --save @ant-design/icons

//API_JSON
//npm i axios . Tao file db.json cung cap voi file package.json => Vao package.json, tai Debug tao lenh:
//"server": "json-server --watch db.json --port 4000"
//Chay bang lenh npm run start => http://localhost:4000/tasks hoac http://localhost:4000

//Tao file moi truong .env ngang cap db.json chua noi dung:
//REACT_APP_BE_URL = http://localhost:4000/
//Chay lai tu dau de react hieu file .env
//Dat  console.log(process.env.REACT_APP_BE_URL, "ullll");
//http://localhost:4000/ ullll la THANH CONG

//Tao ra thu muc /apis trong /src => tao file taskApi.js hoac nhieu file tac vu khac nhu productApi.js
// const TaskApi = {
//  getAllTasks : async () => {
//   await ....
//  }
// }
