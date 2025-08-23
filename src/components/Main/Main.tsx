import { useState, type FormEvent, type ChangeEvent } from "react";
import { Task } from "../Task/Task";
import styles from "./Main.module.css";
import { CirclePlus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Clipboard from "../../assets/Clipboard.svg"

type TaskProp = {
  id: string;
  name: string;
  isChecked: boolean;
};

export function Main() {
  const [tasks, setTasks] = useState<TaskProp[]>([]);

  const [taskName, setTaskName] = useState("");

  const [isChecked] = useState(false);

  const tasksCount = tasks.length;

  const tasksDone = tasks.filter((task) => task.isChecked === true);

  const tasksDoneCount = tasksDone.length;

  function handleTask(event: ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function toggleTask(idTask: string) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === idTask ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const newTask: TaskProp = {
      id: uuidv4(),
      name: taskName,
      isChecked,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
  }

  function handleDeleteTask(id: string) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  return (
    <main className={styles.main}>
      <div className={styles.tasks}>
        <form className={styles.newTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={taskName}
            onChange={handleTask}
          />

          <button onClick={handleSubmit} className={styles.buttonCreate}>
            <span>Criar</span>
            <CirclePlus />
          </button>
        </form>

        <div className={styles.info}>
          <div className={styles.tasksCreated}>
            <span className={styles.tasksInfo}>Tarefas criadas</span>
            <span className={styles.tasksCount}>{tasksCount}</span>
          </div>

          <div className={styles.tasksFinished}>
            <span className={styles.done}>Concluidas</span>

            <span className={styles.doneCount}>
              {`${tasksDoneCount} de ${tasksCount}`}
            </span>
          </div>
        </div>

        {tasks.length > 0 ? <ul className={styles.tasksList}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </ul> : 
        <div className={styles.alternative}>
          <img src={Clipboard} alt="" />
          <div>
            <span>
            Você ainda não tem tarefas cadastradas
            
          </span>
          <span>
            Crie tarefas e organize seus itens a fazer
          </span>

          </div>
          
        </div>}

        
      </div>
    </main>
  );
}
