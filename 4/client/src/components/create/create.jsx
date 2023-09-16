import { useState } from "react";
import { Button, Input, Date } from "../../ui";
import { TaskAPI } from "../../api";
import styles from "./create.module.css";

const task = TaskAPI()

export const Create = ({fetchTask}) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const handleInput = (e) => setText(e.target.value);

  const handleDate = (e) => setDate(e.target.value);

  const handleAdd = async () => {
    const userId = localStorage.getItem("userId")
    const refreshtoken = localStorage.getItem("refreshtoken")

   const response = await task.create({text, userId, refreshtoken, doneDate: date})

    setText("");
    setDate("");

    if(response) {
      fetchTask()
    }
  };

  return (
    <section className={styles.create}>
      <Input
        value={text}
        onChange={handleInput}
        className={styles.input}
        placeholder="Хотите добавить задачу?"
      />
      <Date value={date} onChange={handleDate} className={styles.date} />
      <Button onClick={handleAdd} className={styles.button}>
        Добавить
      </Button>
    </section>
  );
};
