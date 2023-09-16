import { Button, Checkbox, Date, Input } from "../../ui";
import { utilsDate } from "../../utils";
import { TaskAPI } from "../../api";
import { useState } from "react";
import styles from "./task.module.css";

const taskAPI = TaskAPI();

export const TaskList = ({sort, tasks, fetchTask}) => {
  const fetchUpdate = async (taskId, text, doneDate, complete) => {
    const refreshtoken = localStorage.getItem("refreshtoken");

     const response = await taskAPI.update({
      taskId,
      text,
      doneDate,
      complete,
      refreshtoken,
    });

    if(response) {
      fetchTask()
    }
  }

  const fetchRemove = async (taskId) => {
    const refreshtoken = localStorage.getItem("refreshtoken");
    const response = await taskAPI.remove({ taskId, refreshtoken });

    if(response) {
      fetchTask()
    }
  }

  return (
    <ul className={styles.ul}>
      {tasks
        .sort((a, b) => {
          if (sort[0].active) return utilsDate.sortDate(a.createdAt, b.createdAt, sort[0].asc);

          if (sort[1].active) return utilsDate.sortDate(a.doneAt, b.doneAt, sort[1].asc);
        })
        .map(({ ...data }) => (
          <Task key={data.id} {...data} fetchRemove={fetchRemove} fetchUpdate={fetchUpdate} />
        ))}
    </ul>
  );
};

const Task = ({ id, complete, text, doneAt, createdAt, fetchRemove, fetchUpdate }) => {
  const [flagEdit, setFlagEdit] = useState(false);
  const [inputText, setInputText] = useState(text);
  const [inputDate, setInputDate] = useState(doneAt ? doneAt : null);
  const [checkbox, setCheckbox] = useState(complete);

  const handleDelete = () => {
    fetchRemove (id);
  };

  const handleAcceptChange = () => {
    fetchUpdate(id, inputText, inputDate, checkbox)
    setFlagEdit(false);
  };

  const handleCheckbox = () => {
    const refreshtoken = localStorage.getItem("refreshtoken");
    taskAPI.update({
      taskId: id,
      refreshtoken,
      doneAt,
      complete: !checkbox,
      text,
    });
    setCheckbox(!checkbox);
  };

  const handleEdit = () => setFlagEdit(true);

  return flagEdit ? (
    <EditTask
      handleEdit={handleEdit}
      handleCheckbox={handleCheckbox}
      handleAcceptChange={handleAcceptChange}
      setFlagEdit={setFlagEdit}
      setCheckbox={setCheckbox}
      setInputDate={setInputDate}
      setInputText={setInputText}
      doneAt={doneAt}
      checkbox={checkbox}
      inputText={inputText}
      inputDate={inputDate}
      createdAt={createdAt}
    />
  ) : (
    <InfoTask
      setFlagEdit={setFlagEdit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleCheckbox={handleCheckbox}
      doneAt={doneAt}
      checkbox={checkbox}
      inputDate={inputDate}
      inputText={inputText}
      createdAt={createdAt}
    />
  );
};

const EditTask = (props) => {
  return (
    <li className={styles.li}>
      <Checkbox
        className={styles.checkbox}
        onChange={props.handleCheckbox}
        checked={props.checkbox}
      />
      <Input
        value={props.inputText}
        onChange={(e) => props.setInputText(e.target.value)}
      />
      <div className={styles.createDate}>
        создана: {utilsDate.formatDate(props.createdAt)}
      </div>
      {props.doneAt && (
        <Date
          onChange={(e) => props.setInputDate(e.target.value)}
          value={props.inputDate}
        />
      )}
      <div className={styles.buttons}>
        <Button
          onClick={props.handleAcceptChange}
          className={styles.accept}
          variant="default"
        >
          принять
        </Button>
      </div>
    </li>
  );
};

const InfoTask = (props) => {
  return (
    <li className={styles.li}>
      <Checkbox
        className={styles.checkbox}
        onChange={props.handleCheckbox}
        checked={props.checkbox}
      />
      <div className={styles.text}>{props.inputText}</div>
      <div className={styles.createDate}>
        создана: {utilsDate.formatDate(props.createdAt)}
      </div>
      {props.doneAt && (
        <div className={styles.doneDate}>
          выполнить: {utilsDate.formatDate(props.inputDate)}
        </div>
      )}
      <div className={styles.buttons}>
        <Button
          onClick={props.handleDelete}
          className={styles.remove}
          variant="default"
        >
          удалить
        </Button>
        <Button
          onClick={props.handleEdit}
          className={styles.edit}
          variant="default"
        >
          изменить
        </Button>
      </div>
    </li>
  );
};