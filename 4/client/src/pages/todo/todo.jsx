import { useEffect, useState } from "react";
import { TaskList, Filter, Create } from "../../components";
import { TaskAPI } from "../../api";
import styles from "./todo.module.css";

const taskApi = TaskAPI();

export const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [sort, setSort] = useState([
    { id: 0, name: "Cоздание", active: true, asc: true },
    { id: 1, name: "Выполнение", active: false, asc: true },
  ]);

  const fetchTask = async () => {
    const userId = localStorage.getItem("userId");
    const refreshtoken = localStorage.getItem("refreshtoken");

    const response = await taskApi.get({ userId, refreshtoken });

    if (response) {
      setTasks(response);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <main className={styles.todo}>
      <h1 className={styles.title}>TodoApp</h1>
      <Create fetchTask={fetchTask} />
      <TaskList sort={sort} tasks={tasks} fetchTask={fetchTask} />
      <Filter sort={sort} setSort={setSort} fetchTask={fetchTask} />
    </main>
  );
};
